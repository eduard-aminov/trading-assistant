import { Injectable } from '@angular/core';
import { Store } from '../../core/abstract/store.abstract';
import { MarketListWidgetState } from '../interfaces/market-list-widget.interface';

const initialState: MarketListWidgetState = {
  markets: [
    {icon: '', name: 'SBER', price: 110, dayPercentageChange: 1},
    {icon: '', name: 'GAZP', price: 120, dayPercentageChange: 2},
    {icon: '', name: 'LKOH', price: 130, dayPercentageChange: 3},
  ],
};

@Injectable()
export class MarketListWidgetStoreService extends Store<MarketListWidgetState> {

  constructor() {
    super(initialState);
  }
}
