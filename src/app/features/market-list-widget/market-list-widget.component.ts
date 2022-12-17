import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MarketListWidgetFacadeService } from './services/market-list-widget.facade.service';
import { combineLatest, takeUntil } from 'rxjs';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'app-market-list-widget',
  templateUrl: './market-list-widget.component.html',
  styleUrls: ['./market-list-widget.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListWidgetComponent implements OnInit, OnDestroy {

  public readonly markets$ = this.facade.markets$;
  public readonly isMarketsLoading$ = this.facade.isMarketsLoading$;

  constructor(
    @Inject(MarketListWidgetFacadeService) private facade: MarketListWidgetFacadeService,
    @Inject(DestroyService) private destroy$: DestroyService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      // this.facade.openMarketsChangesConnection(),
      // this.facade.subscribeMarketsChanges(),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.facade.closeMarketsChangesConnection().pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
