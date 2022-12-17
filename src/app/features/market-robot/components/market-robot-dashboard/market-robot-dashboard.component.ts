import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MarketRobotFacadeService } from '../../services/market-robot.facade.service';
import { DestroyService } from '../../../../core/services/destroy.service';
import { marketRobotWidgetItems } from '../../mocks/market-robot-widget.mock';

@Component({
  selector: 'app-market-robot-dashboard',
  templateUrl: './market-robot-dashboard.component.html',
  styleUrls: ['./market-robot-dashboard.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketRobotDashboardComponent {
  public marketRobotWidgetItems = marketRobotWidgetItems;

  constructor(
    @Inject(MarketRobotFacadeService) private facade: MarketRobotFacadeService,
    @Inject(DestroyService) private destroy$: DestroyService,
  ) {
  }
}
