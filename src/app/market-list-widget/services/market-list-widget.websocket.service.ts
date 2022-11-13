import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { map, Observable, tap } from 'rxjs';
import { match } from '../../core/utils/pattern-matching';
import { TradingViewPacketType } from '../../core/enums/trading-view-packet-type';
import { TradingViewWebSocketMessage } from '../../core/models/trading-view-web-socket-message';
import {
  TradingViewWebSocketDUPacketData,
  TradingViewWebSocketSymbolResolvedPacketData
} from '../../core/interfaces/trading-view-web-socket-packet.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';
import { WIDGET_NAME_TOKEN } from '../../core/tokens/widget-name.token';

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
            .case(TradingViewPacketType.SymbolResolved, () => this.onSymbolResolved(message))
            .case(TradingViewPacketType.Du, () => this.onDataUpdate(message))
            .default(() => console.log(message));
        }
      })),
      map(() => true)
    );
  }

  private onSymbolResolved(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketSymbolResolvedPacketData;
    const market = new MarketListWidgetItem(data);
    this.store.addMarket(market);
  }

  private onDataUpdate(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketDUPacketData;
    // const markets = data.map(item => new MarketListWidgetItem(item))
    // this.store.setMarkets(markets);
  }
}
