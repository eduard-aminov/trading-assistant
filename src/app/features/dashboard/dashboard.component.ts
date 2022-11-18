import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DashboardFacadeService } from './services/dashboard.facade.service';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    @Inject(DashboardFacadeService) private facade: DashboardFacadeService,
    @Inject(DestroyService) private destroy$: DestroyService,
  ) {
  }
}
