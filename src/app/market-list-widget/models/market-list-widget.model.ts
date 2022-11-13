import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class MarketListWidgetItem {
  icon?: string;
  name: string;
  price?: number;
  dayPercentageChange?: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const symbol = data[1].n;
    const quoteData = data[1].v;
    this.icon = '';
    this.name = symbol ?? '';
    this.price = quoteData?.lp;
    this.dayPercentageChange = 0;
  }
}
