import { TradingViewMarket } from '../../interfaces/trading-view/trading-view-market.interface';
import { PricePeriod } from './price-period.model';

export class Market {
  name: string;
  tickerName: string;
  type: string;
  pricePeriod: PricePeriod;

  constructor(data: TradingViewMarket) {
    this.name = data.local_description ?? data.description;
    this.tickerName = data.name;
    this.type = data.type;
    this.pricePeriod = {
      time: new Date().getMilliseconds(),
      max: 0,
      min: 0,
      close: 0,
      open: 0,
      volume: 0,
    };
  }

  public setPricePeriod(period: PricePeriod): void {
    this.pricePeriod = period;
  }
}
