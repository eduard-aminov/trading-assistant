import { QsdMessage } from '../../../core/classes/messages/qsd-message';

export class MarketListWidgetItem {
  symbol: string;
  icon?: string;
  name?: string;
  currency: string;
  price: number;
  volume: number;
  dayPercentageChange?: number;

  constructor(message: QsdMessage) {

    this.symbol = message.symbol;
    this.icon = '';
    this.name = message.symbol;
    this.price = message.data?.lp ?? 0;
    this.currency = message.data?.currency_code ?? 'USD';
    this.dayPercentageChange = message.data?.chp;
    this.volume = Math.round(message.data?.volume ?? 0);
  }
}
