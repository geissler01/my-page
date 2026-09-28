import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { SearchService } from '../../core/search.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="header">
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-menu-btn" (click)="toggleMobileDrawer.emit()" aria-label="Menu">
            <app-icon name="sidebar" [size]="20"></app-icon>
          </button>
          <a routerLink="/about" class="brand">
            <span class="brand-logo"><app-icon name="logo" [size]="16"></app-icon></span>
            <span class="brand-text">geislera.com</span>
          </a>
          <nav class="nav-links">
            <a routerLink="/about" routerLinkActive="active" class="nav-link">Sobre Mí</a>
            <a routerLink="/projects" routerLinkActive="active" class="nav-link">Proyectos</a>
            <a routerLink="/stack" routerLinkActive="active" class="nav-link">Stack</a>
            <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contacto</a>
          </nav>
        </div>

        <div class="header-right">
          <button class="search-trigger" (click)="searchService.open()" aria-label="Buscar">
            <app-icon name="search" [size]="16"></app-icon>
            <span class="search-label">Buscar proyectos, stacks...</span>
            <kbd class="search-kbd">Ctrl K</kbd>
          </button>
          <div class="action-icons">
            <button class="icon-btn" (click)="themeService.toggleTheme()" title="Cambiar tema">
              <app-icon [name]="themeService.currentTheme() === 'dark' ? 'sun' : 'moon'" [size]="18"></app-icon>
            </button>
            <a href="https://www.linkedin.com/in/geisler-aldana" target="_blank" rel="noopener" class="icon-btn linkedin" title="LinkedIn">
              <app-icon name="linkedin" [size]="18"></app-icon>
            </a>
            <a href="https://github.com/geissler01" target="_blank" rel="noopener" class="icon-btn github" title="GitHub">
              <app-icon name="github" [size]="18"></app-icon>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header { height: var(--header-height); background: var(--bg-card); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 50; box-shadow: var(--shadow-sm); display: flex; align-items: center; padding: 0 1.5rem; }
    .header-inner { width: 100%; max-width: 1380px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
    .header-left, .header-right, .action-icons { display: flex; align-items: center; gap: 1rem; }
    .brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; font-size: 1.15rem; color: var(--text-primary); }
    .brand-logo { width: 28px; height: 28px; border-radius: 7px; background: var(--accent-glow); border: 1px solid var(--accent-primary); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; }
    .nav-links { display: flex; align-items: center; gap: 0.35rem; margin-left: 1.25rem; }
    .nav-link { font-size: 0.88rem; font-weight: 500; color: var(--text-secondary); padding: 0.4rem 0.85rem; border-radius: 6px; transition: all 0.15s; }
    .nav-link:hover { color: var(--text-primary); background: var(--bg-card-hover); }
    .nav-link.active { color: var(--accent-primary); font-weight: 600; background: var(--accent-glow); }
    .search-trigger { display: flex; align-items: center; gap: 0.75rem; background: var(--bg-input); border: 1px solid var(--border-color); padding: 0.45rem 1rem; border-radius: 8px; color: var(--text-muted); font-size: 0.85rem; min-width: 270px; transition: border-color 0.2s; }
    .search-trigger:hover { border-color: var(--accent-primary); color: var(--text-secondary); }
    .search-kbd { margin-left: auto; font-size: 0.7rem; background: var(--bg-canvas); border: 1px solid var(--border-color); padding: 0.15rem 0.45rem; border-radius: 4px; }
    .icon-btn { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); border: 1px solid var(--border-color); transition: all 0.15s; }
    .icon-btn:hover { color: var(--accent-primary); border-color: var(--accent-primary); background: var(--bg-card-hover); }
    .icon-btn.linkedin { color: #0a66c2; border-color: rgba(10, 102, 194, 0.35); }
    .icon-btn.linkedin:hover { background: rgba(10, 102, 194, 0.12); border-color: #0a66c2; color: #0a66c2; }
    .icon-btn.github:hover { color: var(--text-primary); border-color: var(--text-primary); }
    .mobile-menu-btn { display: none; color: var(--text-primary); }
    @media (max-width: 900px) { .nav-links, .search-label, .search-kbd { display: none; } .search-trigger { min-width: auto; padding: 0.45rem; } .mobile-menu-btn { display: block; } }
  `]
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly searchService = inject(SearchService);
  readonly toggleMobileDrawer = output<void>();
}
