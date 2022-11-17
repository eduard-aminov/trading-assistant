import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class NotificationsListWidgetItem {
  marketName: string;
  marketPrice: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const quoteData = data[1].v;

    this.marketName = quoteData.short_name ?? 'EMPTY';
    this.marketPrice = quoteData?.lp ?? 0;
  }
}
