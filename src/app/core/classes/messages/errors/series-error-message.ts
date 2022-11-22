import { Message } from '../message';

export type SeriesErrorPacketData = [
  string, // sessionId
  string, // error message
  string, // seriesId
];

export class SeriesErrorMessage implements Message {
  public sessionId: string;
  public data: string;

  constructor(
    private responseData: SeriesErrorPacketData,
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
    return true;
  }

  isSymbolError(): boolean {
    return false;
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
