import { Message } from './message';

export type QuoteCompletedPacketData = [
  string, // sessionId
  string, // symbol
];

export class QuoteCompletedMessage implements Message {

  public sessionId: string;
  public symbol: string;

  constructor(
    private responseData: QuoteCompletedPacketData,
  ) {
    this.sessionId = responseData[0];
    this.symbol = responseData[1];
  }

  isQuoteCompleted(): boolean {
    return true;
  }

  isQsd(): boolean {
    return false;
  }

  isError(): boolean {
    return false;
  }

  isCriticalError(): boolean {
    return false;
  }

  isProtocolError(): boolean {
    return false;
  }

  isSeriesError(): boolean {
    return false;
  }

  isSymbolError(): boolean {
    return false;
  }
}
