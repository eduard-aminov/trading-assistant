import { Injectable } from '@angular/core';
import { Store } from '../../../core/abstract/store.abstract';
import { MarketListWidgetState } from '../interfaces/market-list-widget.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';

const initialState: MarketListWidgetState = {
  markets: [],
  isMarketsLoading: true,
  isMarketsEmpty: true,
};

@Injectable()
export class MarketListWidgetStoreService extends Store<MarketListWidgetState> {
  constructor() {
    super(initialState);
  }

  public setMarkets(markets: MarketListWidgetItem[]): void {
    this.setState({markets});
  }

  public addMarket(market: MarketListWidgetItem): void {
    this.setState({markets: [...this.stateSnapshot.markets, market]});
  }

  public updateMarket(market: MarketListWidgetItem): void {
    const markets = this.stateSnapshot.markets.map(item => {
      if (item.symbol === market.symbol) {
        return market;
      }
      return item;
    });
    this.setMarkets(markets);
  }
}
