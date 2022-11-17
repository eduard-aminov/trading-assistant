import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class NotificationsListWidgetItem {
  marketName: string;
  marketPrice: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const symbol = data[1].n;
    const quoteData = data[1].v;

    this.marketName = symbol;
    this.marketPrice = quoteData?.lp ?? 0;
  }
}
