import { MarketRobotWidgetItem } from '../interfaces/market-robot.interface';

export const marketRobotWidgetItems: MarketRobotWidgetItem[] = [
  {
    shareNumber: 50000,
    long: {
      number: 100,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    },
    short: {
      number: 50,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    }
  },
  {
    shareNumber: 100000,
    long: {
      number: 100,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    },
    short: {
      number: 50,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    }
  },
  {
    shareNumber: 200000,
    long: {
      number: 100,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    },
    short: {
      number: 50,
      lastTime: new Date().toLocaleTimeString(),
      averageTime: new Date().toLocaleTimeString(),
    }
  },
];
