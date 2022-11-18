import { Inject, Injectable } from '@angular/core';
import { DashboardStoreService } from './dashboard.store.service';
import { DashboardApiService } from './dashboard.api.service';

@Injectable()
export class DashboardFacadeService {
  constructor(
    @Inject(DashboardStoreService) private store: DashboardStoreService,
    @Inject(DashboardApiService) private api: DashboardApiService,
  ) {}
}

