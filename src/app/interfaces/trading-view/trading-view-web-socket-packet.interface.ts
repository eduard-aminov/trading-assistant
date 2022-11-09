import { TradingViewPacketType } from '../../enums/trading-view-packet-type';

export interface TradingViewWebSocketPacket {
  m: TradingViewPacketType;
  p: any[];
}

export type TradingViewWebSocketResponse = (TradingViewWebSocketPacket | number)[];
