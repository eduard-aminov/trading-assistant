import { Message } from '../message';

export type CriticalErrorPacketData = [
  string, // sessionId
  string, // error message
  string, // seriesId
];

export class CriticalErrorMessage implements Message {
  public sessionId: string;
  public data: string;

  constructor(
    private responseData: CriticalErrorPacketData,
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
    return false;
  }

  isCriticalError(): boolean {
    return true;
  }

  isProtocolError(): boolean {
    return false;
  }

  isQuoteCompleted(): boolean {
    return false;
  }
}
