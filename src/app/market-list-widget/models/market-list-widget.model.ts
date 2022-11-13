import {
  TradingViewWebSocketSymbolResolvedPacketData
} from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class MarketListWidgetItem {
  icon?: string;
  name: string;
  price?: number;
  dayPercentageChange?: number;

  constructor(data: TradingViewWebSocketSymbolResolvedPacketData) {
    this.icon = '';
    this.name = data[2].name;
    this.price = 0;
    this.dayPercentageChange = 0;
  }
}
