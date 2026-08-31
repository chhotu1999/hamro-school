import { Component, Input } from '@angular/core';

export interface RankedItem {
  label: string;
  value: number;
}

@Component({
  selector: 'ui-ranked-list',
  standalone: false,
  templateUrl: './ranked-list.component.html',
  styleUrl: './ranked-list.component.less',
})
export class RankedListComponent {
  @Input({ required: true }) items!: RankedItem[];
}
