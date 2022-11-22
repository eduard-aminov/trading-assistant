export interface Message {
  sessionId: string;
  data?: any;

  isQsd(): boolean;

  isQuoteCompleted(): boolean;

  isError(): boolean;

  isSymbolError(): boolean;

  isSeriesError(): boolean;

  isCriticalError(): boolean;

  isProtocolError(): boolean;
}
