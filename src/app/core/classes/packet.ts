import {
  TradingViewWebSocketMessagePacket,
  TradingViewWebSocketSendPacket
} from '../interfaces/trading-view-web-socket-packet.interface';
import {
  TradingViewWebSocketMessagePacketType,
  TradingViewWebSocketSendPacketType
} from '../enums/trading-view-packet-type';
import { ResolveSymbolPacketParams } from '../interfaces/packet.interface';
import { match } from '../utils/pattern-matching';
import { QsdMessage, QsdPacketData } from './messages/qsd-message';
import { CriticalErrorMessage, CriticalErrorPacketData } from './messages/errors/critical-error-message';
import { Message } from './messages/message';
import { SymbolErrorMessage, SymbolErrorPacketData } from './messages/errors/symbol-error-message';
import { SeriesErrorMessage, SeriesErrorPacketData } from './messages/errors/series-error-message';
import { ProtocolErrorMessage, ProtocolErrorPacketData } from './messages/errors/protocol-error-message';
import { QuoteCompletedMessage, QuoteCompletedPacketData } from './messages/quote-completed-message';

export interface Packet {
  format(): any;
}

export class SendPacket implements Packet {
  constructor(
    private data: TradingViewWebSocketSendPacket | string,
  ) {}

  public format(): string {
    const msg = typeof this.data === 'object'
                ? JSON.stringify(this.data)
                : String(this.data);
    return `~m~${msg.length}~m~${msg}`;
  }
}

const cleanerRgx = /~h~/g;
const splitterRgx = /~m~[0-9]+~m~/g;

export class MessagePacket implements Packet {
  constructor(
    private data: string,
  ) {}

  public getMessages(): Message[] {
    const packets = this.format();
    return packets.map(packet => match(packet.m)
      .case(TradingViewWebSocketMessagePacketType.QuoteCompleted, new QuoteCompletedMessage(packet.p as QuoteCompletedPacketData))
      // .case(TradingViewWebSocketMessagePacketType.Du, new QsdMessage(packet.p as QsdPacketData))
      .case(TradingViewWebSocketMessagePacketType.Qsd, new QsdMessage(packet.p as QsdPacketData))
      // .case(TradingViewWebSocketMessagePacketType.SeriesLoading, new QsdMessage(packet.p as QsdPacketData))
      // .case(TradingViewWebSocketMessagePacketType.SeriesCompleted, new QsdMessage(packet.p as QsdPacketData))
      // .case(TradingViewWebSocketMessagePacketType.SymbolResolved, new QsdMessage(packet.p as QsdPacketData))
      // .case(TradingViewWebSocketMessagePacketType.TimescaleUpdate, new QsdMessage(packet.p as QsdPacketData))
      .case(TradingViewWebSocketMessagePacketType.SymbolError, new SymbolErrorMessage(packet.p as SymbolErrorPacketData))
      .case(TradingViewWebSocketMessagePacketType.SeriesError, new SeriesErrorMessage(packet.p as SeriesErrorPacketData))
      .case(TradingViewWebSocketMessagePacketType.CriticalError, new CriticalErrorMessage(packet.p as CriticalErrorPacketData))
      .case(TradingViewWebSocketMessagePacketType.ProtocolError, new ProtocolErrorMessage(packet.p as ProtocolErrorPacketData))
      .default(() => {
        throw new Error(`Unknown message type ${packet.m}`);
      })
    );
  }

  public format(): TradingViewWebSocketMessagePacket[] {
    return this.data.replace(cleanerRgx, '')
               .split(splitterRgx)
               .map((p) => {
                 if (!p) {
                   return false;
                 }
                 try {
                   return JSON.parse(p);
                 } catch (error) {
                   console.warn('Cant parse', p);
                   return false;
                 }
               })
               .filter((p) => p);
  }

  public isPing(value: any): boolean {
    return typeof value[0] === 'number';
  }
}

export class SetAuthTokenPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.SetAuthToken,
      p: params,
    });
  }
}

export class ChartCreateSessionPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.ChartCreateSession,
      p: params,
    });
  }
}

export class ResolveSymbolPacket extends SendPacket {
  constructor(params: ResolveSymbolPacketParams) {
    super({
      m: TradingViewWebSocketSendPacketType.ResolveSymbol,
      p: `=${JSON.stringify(params)}`,
    });
  }
}

export class CreateSeriesPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.CreateSeries,
      p: params,
    });
  }
}

export class QuoteCreateSessionPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteCreateSession,
      p: params,
    });
  }
}

export class QuoteSetFieldsPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteSetFields,
      p: params,
    });
  }
}

export class QuoteAddSymbolsPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteAddSymbols,
      p: params,
    });
  }
}

export class QuoteRemoveSymbolsPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteRemoveSymbols,
      p: params,
    });
  }
}

export class QuoteFastSymbolsPacket extends SendPacket {
  constructor(params: any) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteFastSymbols,
      p: params,
    });
  }
}
