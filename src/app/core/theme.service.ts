import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<Theme>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('geislera_theme') as Theme;
      if (saved === 'dark' || saved === 'light') {
        this.currentTheme.set(saved);
      }
      effect(() => {
        const theme = this.currentTheme();
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('geislera_theme', theme);
      });
    }
  }

  toggleTheme(): void {
    this.currentTheme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }
}
