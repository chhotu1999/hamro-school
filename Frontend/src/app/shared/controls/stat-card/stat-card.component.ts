import { Component, Input } from '@angular/core';
import { IconName } from '../icon/icon.component';

@Component({
  selector: 'ui-stat-card',
  standalone: false,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.less',
})
export class StatCardComponent {
  @Input({ required: true }) icon!: IconName;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
  @Input() delta: number | null = null;

  get isPositive(): boolean {
    return (this.delta ?? 0) >= 0;
  }

  get deltaAbs(): number {
    return Math.abs(this.delta ?? 0);
  }
}
