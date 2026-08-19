import { Component, input } from '@angular/core';

export type IconName =
  | 'grid'
  | 'users'
  | 'book'
  | 'wallet'
  | 'chart-bar'
  | 'settings'
  | 'logout'
  | 'chevron-left'
  | 'moon'
  | 'sun'
  | 'arrow-up-right'
  | 'arrow-down-right'
  | 'plus'
  | 'calendar'
  | 'search'
  | 'eye'
  | 'trash'
  | 'shield'
  | 'building'
  | 'bell'
  | 'user-plus'
  | 'swap'
  | 'check-square'
  | 'file-text'
  | 'id-card'
  | 'phone'
  | 'key'
  | 'briefcase'
  | 'award'
  | 'percent'
  | 'gift'
  | 'credit-card'
  | 'route'
  | 'home'
  | 'box'
  | 'mail'
  | 'activity'
  | 'alert-triangle'
  | 'truck';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.less',
})
export class Icon {
  name = input.required<IconName>();
  size = input(18);
}
