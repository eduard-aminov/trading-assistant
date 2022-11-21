import {
  TradingViewWebSocketMessagePacket,
  TradingViewWebSocketPacketData,
  TradingViewWebSocketSendPacket
} from '../interfaces/trading-view-web-socket-packet.interface';
import { TradingViewWebSocketMessage } from '../models/trading-view-web-socket-message';
import { TradingViewWebSocketSendPacketType } from '../enums/trading-view-packet-type';
import { ResolveSymbolPacketParams } from '../interfaces/packet.interface';

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

  public getMessages(): TradingViewWebSocketMessage[] {
    const packets = this.format();
    return packets.map(packet => new TradingViewWebSocketMessage(packet));
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
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.SetAuthToken,
      p: params,
    });
  }
}

export class ChartCreateSessionPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
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
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.CreateSeries,
      p: params,
    });
  }
}

export class QuoteCreateSessionPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteCreateSession,
      p: params,
    });
  }
}

export class QuoteSetFieldsPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteSetFields,
      p: params,
    });
  }
}

export class QuoteAddSymbolsPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteAddSymbols,
      p: params,
    });
  }
}

export class QuoteRemoveSymbolsPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteRemoveSymbols,
      p: params,
    });
  }
}

export class QuoteFastSymbolsPacket extends SendPacket {
  constructor(params: TradingViewWebSocketPacketData) {
    super({
      m: TradingViewWebSocketSendPacketType.QuoteFastSymbols,
      p: params,
    });
  }
}
