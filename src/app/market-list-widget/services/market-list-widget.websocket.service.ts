import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { map, Observable, tap } from 'rxjs';
import { match } from '../../core/utils/pattern-matching';
import { TradingViewWebSocketMessage } from '../../core/models/trading-view-web-socket-message';
import { WIDGET_NAME_TOKEN } from '../../core/tokens/widget-name.token';
import { TradingViewWebSocketMessagePacketType } from '../../core/enums/trading-view-packet-type';
import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';
import { removeFalsyPropValueFromObject } from '../../core/utils/remove-falsy-props-from-object';

@Injectable()
export class MarketListWidgetWebsocketService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
    @Inject(WIDGET_NAME_TOKEN) private widgetName: string,
  ) {}

  public run(): Observable<boolean> {
    return this.api.messages$.pipe(
      tap(messages => messages.forEach(message => {
        if (message.sessionId === this.widgetName) {
          match(message.type)
            .case(TradingViewWebSocketMessagePacketType.Qsd, () => this.onQsd(message))
            .default();
        }
      })),
      map(() => true)
    );
  }

  private onQsd(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketQsdPacketData;
    const newMarket = new MarketListWidgetItem(data);
    const existMarket = this.store.stateSnapshot.markets.find(item => item.name === newMarket.name);

    if (existMarket) {
      this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(newMarket)});
    } else {
      this.store.addMarket(newMarket);
    }
  }

  // private onSymbolResolved(message: TradingViewWebSocketMessage): void {
  //   const data = message.data as TradingViewWebSocketSymbolResolvedPacketData;
  //   const market = new MarketListWidgetItem(data);
  //   this.store.addMarket(market);
  // }

  // private onDataUpdate(message: TradingViewWebSocketMessage): void {
  //   const data = message.data as TradingViewWebSocketDUPacketData;
  // const markets = data.map(item => new MarketListWidgetItem(item))
  // this.store.setMarkets(markets);
  // }
}
