import { TradingViewPacketType } from '../enums/trading-view-packet-type';
import { TradingViewMarket } from './trading-view-market.interface';

export interface TradingViewWebSocketPacket {
  m: TradingViewPacketType;
  p: TradingViewWebSocketPacketData;
}

export type TradingViewWebSocketResponse = (TradingViewWebSocketPacket | number)[];

export type TradingViewWebSocketPacketData = TradingViewWebSocketSymbolResolvedPacketData | TradingViewWebSocketDUPacketData;

export type TradingViewWebSocketSymbolResolvedPacketData = [
  string, // sessionId
  string, // seriesId
  TradingViewMarket,
];

export type TradingViewWebSocketDUPacketData = [
  string, // sessionId
  { $prices: { s: { v: number[] }[] } }
];
