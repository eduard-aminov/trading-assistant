import { TradingViewMarket } from '../../interfaces/trading-view/trading-view-market.interface';
import { PricePeriod } from './price-period.model';

export class Market {
  name: string;
  tickerName: string;
  type: string;
  currentPricePeriod: PricePeriod;
  prevPricePeriod: PricePeriod;
  percentageChange: string;

  constructor(data: TradingViewMarket) {
    this.name = data.local_description ?? data.description;
    this.tickerName = data.name;
    this.type = data.type;
    this.percentageChange = '0';
    this.currentPricePeriod = {
      max: 0,
      min: 0,
      close: 0,
      open: 0,
      volume: 0,
    }
    this.prevPricePeriod = {
      max: 0,
      min: 0,
      close: 0,
      open: 0,
      volume: 0,
    }
  }

  public setCurrentPricePeriod(period: PricePeriod): void {
    this.currentPricePeriod = period;
    this.percentageChange = (((period.close / this.prevPricePeriod.close) * 100) - 100).toFixed(2) + '%';
  }

  public setPrevPricePeriod(period: PricePeriod): void {
    this.prevPricePeriod = period;
  }
}
