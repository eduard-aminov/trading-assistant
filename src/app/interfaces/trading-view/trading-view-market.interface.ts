export interface TradingViewMarket {
  currency_code: string;
  session_holidays: string;
  subsession_id: string;
  provider_id: string;
  currency_id: string;
  country: string;
  pro_perm: string;
  allowed_adjustment: string;
  short_description: string;
  variable_tick_size: string;
  nsin: string;
  isin: string;
  delay: number;
  language: string;
  local_description: string;
  name: string;
  full_name: string;
  pro_name: string;
  base_name: string[];
  description: string;
  exchange: string;
  pricescale: number;
  pointvalue: number;
  minmov: number;
  session: string;
  session_display: string;
  subsessions: TradingViewMarketSubsession[];
  type: string;
  typespecs: string[];
  resolutions: string[];
  has_intraday: boolean;
  fractional: boolean;
  listed_exchange: string;
  legs: string[];
  is_tradable: string;
  minmove2: number;
  timezone: string;
  aliases: string[];
  alternatives: string[];
  is_replayable: boolean;
  has_adjustment: boolean;
  has_extended_hours: boolean;
  bar_source: string;
  bar_transform: string;
  bar_fillgaps: boolean;
  visible_plots_set: string;
}

interface TradingViewMarketSubsession {
  description: string;
  id: string;
  private: boolean;
  session: string;
  'session-correction': string;
  'session-display': string;
}
