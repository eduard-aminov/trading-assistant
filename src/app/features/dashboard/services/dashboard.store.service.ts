import { Injectable } from '@angular/core';
import { DashboardState } from '../interfaces/dashboard.interface';
import { Store } from '../../../core/abstract/store.abstract';

const initialState: DashboardState = {
  isDashboardLoading: false,
};

@Injectable()
export class DashboardStoreService extends Store<DashboardState> {
  constructor() {
    super(initialState);
  }
}
