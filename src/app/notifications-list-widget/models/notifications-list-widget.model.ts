import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class NotificationsListWidgetMarket {
  name: string;
  price: number;
  volume: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const symbol = data[1].n;
    const quoteData = data[1].v;

    this.name = symbol;
    this.price = quoteData?.lp ?? 0;
    this.volume = Math.round(quoteData?.volume ?? 0);
  }
}

export class NotificationsListWidgetNotification {
  marketName: string;
  time: string;
  totalSum: number;

  constructor(data: TradingViewWebSocketQsdPacketData, totalSum: number) {
    const now = new Date();
    this.marketName = data[1].n ?? '';
    this.time = `${now.getHours()}:${now.getMinutes()}`;
    this.totalSum = totalSum;
  }
}
