import { MarketListWidgetItem } from '../../market-list-widget/models/market-list-widget.model';
import { QsdMessage } from '../../../core/classes/messages/qsd-message';

export class NotificationsListWidgetMarket {
  name: string;
  currency: string | null;
  price: number;
  volume: number;

  constructor(message: QsdMessage) {
    this.name = message.symbol;
    this.price = message.data.lp ?? 0;
    this.currency = message.data?.currency_code ?? null;
    this.volume = Math.round(message.data?.volume ?? 0);
  }
}

export class NotificationsListWidgetNotification {
  marketName: string;
  marketCurrency?: string;
  time: string;
  volumeTotalSum: number;
  direction: string;
  amount: number;

  constructor(market: MarketListWidgetItem & { volumeTotalSum: number, totalAmount: number, direction: string }) {
    const now = new Date();
    this.marketName = market.symbol;
    this.marketCurrency = market.currency;
    this.time = `${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()}`;
    this.volumeTotalSum = market.volumeTotalSum;
    this.direction = market.direction;
    this.amount = market.totalAmount;
  }
}
