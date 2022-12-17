export interface DashboardState {
  isDashboardLoading: boolean;
}

export interface MarketRobotWidgetItem {
  shareNumber: number;
  long: {
    number: number;
    lastTime: string;
    averageTime: string;
  };
  short: {
    number: number;
    lastTime: string;
    averageTime: string;
  };
}
