import { TradingViewWebSocketQsdPacketData } from '../../core/interfaces/trading-view-web-socket-packet.interface';

export class NotificationsListWidgetMarket {
  name: string;
  currency: string | null;
  price: number;
  volume: number;

  constructor(data: TradingViewWebSocketQsdPacketData) {
    const symbol = data[1].n;
    const quoteData = data[1].v;

    this.name = symbol;
    this.price = quoteData?.lp ?? 0;
    this.currency = quoteData?.currency_code ?? null;
    this.volume = Math.round(quoteData?.volume ?? 0);
  }
}

export class NotificationsListWidgetNotification {
  marketName: string;
  marketCurrency: string | null;
  time: string;
  volumeTotalSum: number;

  constructor(market: NotificationsListWidgetMarket & { volumeTotalSum: number }) {
    const now = new Date();
    this.marketName = market.name;
    this.marketCurrency = market.currency;
    this.time = `${now.getHours()}:${now.getMinutes()}`;
    this.volumeTotalSum = market.volumeTotalSum;
  }
}
