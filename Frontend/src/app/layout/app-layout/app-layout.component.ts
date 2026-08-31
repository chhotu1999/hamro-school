import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.less',
})
export class AppLayoutComponent {
  @Input({ required: true }) title!: string;

  darkMode: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.darkMode = this.document.documentElement.classList.contains('dark');
  }

  onDarkModeToggle(event: MatSlideToggleChange): void {
    this.darkMode = event.checked;
    this.document.documentElement.classList.toggle('dark', event.checked);
  }
}
