export enum TradingViewWebSocketSendPacketType {
  SetAuthToken = 'set_auth_token',
  ChartCreateSession = 'chart_create_session',
  ResolveSymbol = 'resolve_symbol',
  CreateSeries = 'create_series',
  QuoteCreateSession = 'quote_create_session',
  QuoteSetFields = 'quote_set_fields',
  QuoteAddSymbols = 'quote_add_symbols',
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
