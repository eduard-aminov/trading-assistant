import { TradingViewQuoteData } from '../../interfaces/trading-view.interface';
import { Message } from './message';

export type QsdPacketData = [
  string, // sessionId
  {
    n: string, // symbol
    s: string,
    v: Partial<TradingViewQuoteData>
  }
];

export class QsdMessage implements Message {

  public sessionId: string;
  public symbol: string;
  public data: Partial<TradingViewQuoteData>;

  constructor(
    private responseData: QsdPacketData,
  ) {
    this.sessionId = responseData[0];
    this.symbol = responseData[1].n;
    this.data = responseData[1].v;
  }

  isQuoteCompleted(): boolean {
    return false;
  }

  isQsd(): boolean {
    return true;
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
