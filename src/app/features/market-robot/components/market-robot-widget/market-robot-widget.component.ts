import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarketRobotWidgetItem } from '../../interfaces/market-robot.interface';

@Component({
  selector: 'app-market-robot-widget',
  templateUrl: './market-robot-widget.component.html',
  styleUrls: ['./market-robot-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketRobotWidgetComponent {
  @Input() marketName: string | undefined;
  @Input() items: MarketRobotWidgetItem[] | undefined;
}
