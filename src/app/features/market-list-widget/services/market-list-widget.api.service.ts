import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../../core/services/trading-view-api.service';
import { combineLatest, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { match } from '../../../core/utils/pattern-matching';
import { TradingViewWebSocketMessagePacketType } from '../../../core/enums/trading-view-packet-type';
import { TradingViewWebSocketMessage } from '../../../core/models/trading-view-web-socket-message';
import {
  TradingViewWebSocketCriticalErrorPacketData,
  TradingViewWebSocketQsdPacketData
} from '../../../core/interfaces/trading-view-web-socket-packet.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';
import { removeFalsyPropValueFromObject } from '../../../core/utils/remove-falsy-props-from-object';

@Injectable()
export class MarketListWidgetApiService {

  private widgetName = 'MarketListWidget';

  private messages$ = this.api.messages$.pipe(
    map(messages => messages.filter(message => message.sessionId === this.widgetName)),
    tap(messages => this.handleMessageErrors(messages)),
  );

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
  ) {}

  public subscribeMarketsChanges(marketsNames: string[]): Observable<MarketListWidgetItem[]> {
    return combineLatest([
      this.messages$,
      this.api.quoteAddSymbols(this.widgetName, marketsNames),
    ]).pipe(
      map(([messages]) => messages.filter(message => message.type === TradingViewWebSocketMessagePacketType.Qsd)),
      map(messages => messages.map(message => new MarketListWidgetItem(message.data as TradingViewWebSocketQsdPacketData))),
    );
  }

  public unsubscribeMarketsChanges(marketsNames: string[]): Observable<void> {
    return combineLatest([
      this.messages$,
      this.api.quoteRemoveSymbols(this.widgetName, marketsNames),
    ]).pipe(
      switchMap(() => EMPTY),
    );
  }

  public run(): Observable<boolean> {
    const fields = ['lp', 'chp', 'short_name', 'volume'];
    return combineLatest([
      this.api.messages$,
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteFastSymbols(this.widgetName),
    ]).pipe(
      map(value => value[0]),
      tap(messages => messages.forEach(message => {
        if (message.sessionId === this.widgetName) {
          match(message.type)
            .case(TradingViewWebSocketMessagePacketType.Qsd, () => this.onQsd(message))
            .case(TradingViewWebSocketMessagePacketType.CriticalError, () => this.onCriticalError(message))
            .default();
        }
      })),
      map(() => true)
    );
  }

  private onQsd(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketQsdPacketData;
    const newMarket = new MarketListWidgetItem(data);
    const existMarket = this.store.stateSnapshot.markets.find(item => item.symbol === newMarket.symbol);

    if (existMarket) {
      this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(newMarket)});
    } else {
      this.store.addMarket(newMarket);
    }
  }

  private handleMessageErrors(messages: TradingViewWebSocketMessage[]): void {
    for (const message of messages) {
      match(message.type)
        .case(TradingViewWebSocketMessagePacketType.CriticalError, () => this.onCriticalError(message))
        .default();
    }
  }

  private onCriticalError(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketCriticalErrorPacketData;
    console.error(`${data[0]} - ${data[1]}`);
  }

  public loadSymbolsData(symbols: string[]): Observable<void> {
    return this.api.quoteAddSymbols(this.widgetName, symbols);
  }
}
