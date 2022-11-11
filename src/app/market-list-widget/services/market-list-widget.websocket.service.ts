import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { tap } from 'rxjs';
import { match } from '../../core/utils/pattern-matching';
import { TradingViewPacketType } from '../../core/enums/trading-view-packet-type';
import { TradingViewWebSocketMessage } from '../../core/models/trading-view-web-socket-message';
import {
  TradingViewWebSocketDUPacketData,
  TradingViewWebSocketSymbolResolvedPacketData
} from '../../core/interfaces/trading-view-web-socket-packet.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';

@Injectable()
export class MarketListWidgetWebsocketService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
  ) {}

  public run(): void {
    this.api.messages$.pipe(
      tap(messages => messages.forEach(message => {
        match(message.type)
          .case(TradingViewPacketType.SymbolResolved, () => this.onSymbolResolved(message))
          .case(TradingViewPacketType.Du, () => this.onDataUpdate(message))
          .default();
      })),
    ).subscribe();
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
