import { Component, computed, input } from '@angular/core';
import { Card } from '../card/card';
import { Icon, IconName } from '../icon/icon';

@Component({
  selector: 'ui-stat-card',
  imports: [Card, Icon],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.less',
})
export class StatCard {
  icon = input.required<IconName>();
  label = input.required<string>();
  value = input.required<string>();
  delta = input<number | null>(null);

  isPositive = computed(() => (this.delta() ?? 0) >= 0);
  deltaAbs = computed(() => Math.abs(this.delta() ?? 0));
}
