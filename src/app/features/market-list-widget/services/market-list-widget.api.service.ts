import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../../core/services/trading-view-api.service';
import { combineLatest, EMPTY, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetItem } from '../models/market-list-widget.model';
import { TradingViewQuoteFields } from '../../../core/interfaces/trading-view.interface';
import { Message } from '../../../core/classes/messages/message';
import { QsdMessage } from '../../../core/classes/messages/qsd-message';

@Injectable()
export class MarketListWidgetApiService {

  private widgetName = 'MarketListWidget';

  private messages$ = this.api.messages$.pipe(
    map(messages => messages.filter(message => message.sessionId === this.widgetName)),
    tap(messages => this.handleErrorMessages(messages)),
  );

  private qsdMessages$ = this.messages$.pipe(
    map(messages => messages.filter(message => message.isQsd()) as QsdMessage[]),
  );

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
  ) {}

  public openMarketsChangesConnection(fields: TradingViewQuoteFields[]): Observable<void> {
    return forkJoin([
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteFastSymbols(this.widgetName),
    ]).pipe(
      switchMap(() => EMPTY),
    );
  }

  public closeMarketChangesConnection(): Observable<void> {
    return this.api.quoteDeleteSession(this.widgetName).pipe(
      switchMap(() => EMPTY),
    );
  };

  public subscribeMarketsChanges(marketsNames: string[]): Observable<MarketListWidgetItem[]> {
    return combineLatest([
      this.qsdMessages$,
      this.api.quoteAddSymbols(this.widgetName, marketsNames),
    ]).pipe(
      map(([messages]) => messages),
      map(messages => messages.map(message => new MarketListWidgetItem(message))),
    );
  }

  public unsubscribeMarketsChanges(marketsNames: string[]): Observable<void> {
    return combineLatest([
      this.qsdMessages$,
      this.api.quoteRemoveSymbols(this.widgetName, marketsNames),
    ]).pipe(
      switchMap(() => EMPTY),
    );
  }

  private handleErrorMessages(messages: Message[]): void {
    const errorMessages = messages.filter(message => message.isError());
    for (const message of errorMessages) {
      console.error(`${message.sessionId} - ${message.data}`);
    }
  }
}
