import { Component, input } from '@angular/core';

export interface RankedItem {
  label: string;
  value: number;
}

@Component({
  selector: 'ui-ranked-list',
  templateUrl: './ranked-list.html',
  styleUrl: './ranked-list.less',
})
export class RankedList {
  items = input.required<RankedItem[]>();
}
