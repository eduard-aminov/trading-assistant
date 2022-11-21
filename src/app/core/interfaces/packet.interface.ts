import { TradingViewTimeframe } from './trading-view.interface';
import { TradingViewChartTypes } from '../enums/trading-view-packet-type';

export interface ResolveSymbolPacketParamsOptions {
  symbol: string;
  timeframe?: TradingViewTimeframe;
  range?: number;
  to?: number;
  adjustment?: 'splits' | 'dividends';
  session?: 'regular' | 'extended';
  currency?: string;
  replay?: number;
  type?: TradingViewChartTypes;
}

export interface ResolveSymbolPacketParams {
  sessionId: string;
  seriesId: string;
  options: ResolveSymbolPacketParamsOptions;
}
