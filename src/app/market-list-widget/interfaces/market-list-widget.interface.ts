import { MarketListWidgetItem } from '../models/market-list-widget.model';

export interface MarketListWidgetState {
  markets: MarketListWidgetItem[];
  isMarketsLoading: boolean;
  isMarketsEmpty: boolean;
}
