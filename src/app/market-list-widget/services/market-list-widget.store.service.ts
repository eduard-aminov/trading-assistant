import { Injectable } from '@angular/core';
import { Store } from '../../core/abstract/store.abstract';
import { MarketListWidgetState } from '../interfaces/market-list-widget.interface';
import { MarketListWidgetItem } from '../models/market-list-widget.model';

const initialState: MarketListWidgetState = {
  markets: [],
  isMarketsLoading: false,
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
}
