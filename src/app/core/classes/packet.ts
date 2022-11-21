import {
  TradingViewWebSocketMessagePacket,
  TradingViewWebSocketSendPacket
} from '../interfaces/trading-view-web-socket-packet.interface';
import { TradingViewWebSocketMessage } from '../models/trading-view-web-socket-message';

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
