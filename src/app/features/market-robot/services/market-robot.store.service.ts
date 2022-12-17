import { Injectable } from '@angular/core';
import { DashboardState } from '../interfaces/market-robot.interface';
import { Store } from '../../../core/abstract/store.abstract';

const initialState: DashboardState = {
  isDashboardLoading: false,
};

@Injectable()
export class MarketRobotStoreService extends Store<DashboardState> {
  constructor() {
    super(initialState);
  }
}
