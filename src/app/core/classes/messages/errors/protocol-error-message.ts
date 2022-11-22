import { Message } from '../message';

export type ProtocolErrorPacketData = [
  string, // sessionId
  string, // error message
  string, // seriesId
];

export class ProtocolErrorMessage implements Message {
  public sessionId: string;
  public data: string;

  constructor(
    private responseData: ProtocolErrorPacketData,
  ) {
    this.sessionId = responseData[0];
    this.data = responseData[1];
  }

  isQuoteCompleted(): boolean {
    return false;
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
    return false;
  }

  isCriticalError(): boolean {
    return false;
  }

  isProtocolError(): boolean {
    return true;
  }
}
