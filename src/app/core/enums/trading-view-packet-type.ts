export enum TradingViewWebSocketSendPacketType {
  SetAuthToken = 'set_auth_token',
  ChartCreateSession = 'chart_create_session',
  ResolveSymbol = 'resolve_symbol',
  CreateSeries = 'create_series',
  QuoteCreateSession = 'quote_create_session',
  QuoteSetFields = 'quote_set_fields',
  QuoteAddSymbols = 'quote_add_symbols',
  QuoteRemoveSymbols = 'quote_remove_symbols',
  QuoteFastSymbols = 'quote_fast_symbols',
}

export enum TradingViewWebSocketMessagePacketType {
  CriticalError = 'critical_error',
  SymbolResolved = 'symbol_resolved',
  SeriesLoading = 'series_loading',
  TimescaleUpdate = 'timescale_update',
  SeriesCompleted = 'series_completed',
  Du = 'du',
  QuoteCompleted = 'quote_completed',
  Qsd = 'qsd',
}

export enum TradingViewChartTypes {
  HeikinAshi = 'BarSetHeikenAshi@tv-basicstudies-60!',
  Renko = 'BarSetRenko@tv-prostudies-40!',
  LineBreak = 'BarSetPriceBreak@tv-prostudies-34!',
  Kagi = 'BarSetKagi@tv-prostudies-34!',
  PointAndFigure = 'BarSetPnF@tv-prostudies-34!',
  Range = 'BarSetRange@tv-basicstudies-72!',
}
