import { DOCUMENT } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-layout',
  imports: [Icon],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.less',
})
export class AppLayout {
  private document = inject(DOCUMENT);

  title = input.required<string>();

  darkMode = signal(this.document.documentElement.classList.contains('dark'));

  toggleDarkMode(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    this.document.documentElement.classList.toggle('dark', next);
  }
}
