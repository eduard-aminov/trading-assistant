import { TradingViewWebSocketQsdPacketData } from '../../../core/interfaces/trading-view-web-socket-packet.interface';

export class MarketListWidgetItem {
  symbol: string;
  icon?: string;
  name?: string;
  price?: number;
  dayPercentageChange?: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const quoteData = data[1].v;

    this.symbol = data[1].n;
    this.icon = '';
    this.name = quoteData.short_name;
    this.price = quoteData?.lp;
    this.dayPercentageChange = quoteData?.chp;
  }
}
