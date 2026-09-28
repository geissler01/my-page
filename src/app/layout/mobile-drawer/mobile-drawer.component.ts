import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsService } from '../../data/projects.service';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isOpen()) {
      <div class="drawer-backdrop" (click)="close.emit()"></div>
      <div class="drawer-panel">
        <div class="drawer-header">
          <span class="drawer-title">geislera.com</span>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>
        <div class="drawer-content">
          <div class="drawer-group">
            <span class="group-title">NAVEGACIÓN</span>
            <div class="group-links">
              <a routerLink="/about" routerLinkActive="active" (click)="close.emit()" class="drawer-link">Sobre Mí</a>
              <a routerLink="/projects" routerLinkActive="active" (click)="close.emit()" class="drawer-link">Proyectos</a>
              <a routerLink="/stack" routerLinkActive="active" (click)="close.emit()" class="drawer-link">Stack Técnico</a>
              <a routerLink="/contact" routerLinkActive="active" (click)="close.emit()" class="drawer-link">Contacto</a>
            </div>
          </div>
          @for (cat of categories; track cat.title) {
            <div class="drawer-group">
              <span class="group-title">{{ cat.title }}</span>
              <div class="group-links">
                @for (item of cat.items; track item.route) {
                  <a [routerLink]="item.route" routerLinkActive="active" (click)="close.emit()" class="drawer-link">
                    <span>{{ item.label }}</span>
                  </a>
                }
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); z-index: 99; }
    .drawer-panel {
      position: fixed; top: 0; left: 0; bottom: 0; width: 80%; max-width: 300px;
      background: var(--bg-surface); z-index: 100; display: flex; flex-direction: column;
      border-right: 1px solid var(--border-subtle); animation: slideIn 0.2s ease-out;
    }
    @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    .drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; border-bottom: 1px solid var(--border-subtle); }
    .drawer-title { font-weight: 700; color: var(--accent-cyan); font-size: 1.1rem; }
    .close-btn { color: var(--text-muted); font-size: 1.2rem; }
    .drawer-content { padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem; }
    .drawer-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .group-title { font-size: 0.72rem; font-weight: 700; color: var(--text-dim); letter-spacing: 0.06em; }
    .group-links { display: flex; flex-direction: column; gap: 0.25rem; }
    .drawer-link {
      padding: 0.5rem 0.65rem; border-radius: 6px; font-size: 0.88rem;
      color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;
    }
    .drawer-link.active { background: var(--accent-cyan-glow); color: var(--accent-cyan); font-weight: 600; }
  `]
})
export class MobileDrawerComponent {
  readonly isOpen = input<boolean>(false);
  readonly close = output<void>();
  private projectsService = inject(ProjectsService);
  readonly categories = this.projectsService.getNavigation();
}
