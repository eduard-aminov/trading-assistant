export type TradingViewTimeframe =
  '1' | '3' | '5' | '15' | '30'
  | '45' | '60' | '120' | '180' | '240'
  | '1D' | '1W' | '1M' | 'D' | 'W' | 'M'

export interface TradingViewQuoteData {
  'base-currency-logoid': string;
  ch: string;
  chp: number;
  'currency-logoid': string;
  currency_code: string;
  current_session: string;
  description: string;
  exchange: string;
  format: string;
  fractional: string;
  is_tradable: string;
  language: string;
  local_description: string;
  logoid: string;
  lp: number;
  lp_time: string;
  minmov: string;
  minmove2: string;
  original_name: string;
  pricescale: string;
  pro_name: string;
  short_name: string;
  update_mode: string;
  volume: string;
  ask: string;
  bid: string;
  fundamentals: string;
  high_price: string;
  low_price: string;
  open_price: string;
  prev_close_price: string;
  rch: string;
  rchp: string;
  rtc: string;
  rtc_time: string;
  industry: string;
  basic_eps_net_income: string;
  beta_1_year: string;
  market_cap_basic: string;
  earnings_per_share_basic_ttm: string;
  price_earnings_ttm: string;
  sector: string;
  dividends_yield: string;
  timezone: string;
  country_code: string;
  provider_id: string;
}

export type TradingViewQuoteFields = keyof TradingViewQuoteData;
