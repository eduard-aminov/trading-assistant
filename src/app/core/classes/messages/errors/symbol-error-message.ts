import { Message } from '../message';

export type SymbolErrorPacketData = [
  string, // sessionId
  string, // error message
  string, // seriesId
];

export class SymbolErrorMessage implements Message {
  public sessionId: string;
  public data: string;

  constructor(
    private responseData: SymbolErrorPacketData,
  ) {
    this.sessionId = responseData[0];
    this.data = responseData[1];
  }

  isQsd(): boolean {
    return false;
  }

  isError(): boolean {
    return true;
  }

  isSeriesError(): boolean {
    return false;
  }

  isSymbolError(): boolean {
    return true;
  }

  isCriticalError(): boolean {
    return false;
  }

  isProtocolError(): boolean {
    return false;
  }

  isQuoteCompleted(): boolean {
    return false;
  }
}
