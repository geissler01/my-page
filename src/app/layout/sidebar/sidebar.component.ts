import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsService } from '../../data/projects.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed()">
      <div class="sidebar-header">
        @if (!isCollapsed()) {
          <span class="sidebar-title">EXPLORADOR</span>
        }
        <button class="toggle-btn" (click)="toggleCollapse.emit()" [title]="isCollapsed() ? 'Mostrar menú' : 'Ocultar menú'">
          <app-icon name="sidebar" [size]="16"></app-icon>
        </button>
      </div>

      @if (!isCollapsed()) {
        <div class="sidebar-body">
          @for (cat of categories; track cat.title) {
            <div class="category-group">
              <button type="button" class="category-btn" (click)="toggleCategory(cat.title)">
                <span class="cat-label">{{ cat.title }}</span>
                <app-icon [name]="isCatOpen(cat.title) ? 'chevron-down' : 'chevron-right'" [size]="13"></app-icon>
              </button>
              @if (isCatOpen(cat.title)) {
                <ul class="nav-list">
                  @for (item of cat.items; track item.route) {
                    <li>
                      <a [routerLink]="item.route" routerLinkActive="active" class="nav-link">
                        <span class="nav-label">{{ item.label }}</span>
                        @if (item.badge) { <span class="nav-badge">{{ item.badge }}</span> }
                      </a>
                    </li>
                  }
                </ul>
              }
            </div>
          }
        </div>
      }
    </aside>
  `,
  styles: [`
    .sidebar { width: 100%; height: 100%; background: var(--sidebar-gradient); backdrop-filter: blur(8px); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; overflow: hidden; }
    .sidebar-header { height: 48px; padding: 0 0.85rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
    .sidebar.collapsed .sidebar-header { justify-content: center; padding: 0; }
    .sidebar-title { font-size: 0.72rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.08em; }
    .toggle-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-secondary); cursor: pointer; transition: all 0.15s; }
    .toggle-btn:hover { border-color: var(--accent-primary); color: var(--text-primary); }
    .sidebar-body { padding: 1rem 0.75rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem; flex: 1; }
    .category-group { display: flex; flex-direction: column; gap: 0.25rem; }
    .category-btn { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.35rem 0.5rem; background: none; border: none; cursor: pointer; color: var(--text-muted); transition: color 0.15s; }
    .category-btn:hover { color: var(--text-primary); }
    .cat-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; }
    .nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.2rem; }
    .nav-link { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.45rem 0.65rem; border-radius: 6px; font-size: 0.83rem; color: var(--text-secondary); transition: all 0.15s; }
    .nav-link:hover { color: var(--text-primary); background: var(--bg-card); }
    .nav-link.active { color: var(--accent-primary); background: var(--accent-glow); font-weight: 600; border-left: 3px solid var(--accent-primary); }
    .nav-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .nav-badge { font-size: 0.62rem; padding: 0.1rem 0.35rem; border-radius: 4px; background: var(--accent-primary); color: var(--btn-cta-text); font-weight: 600; }
  `]
})
export class SidebarComponent {
  private projectsService = inject(ProjectsService);
  readonly isCollapsed = input<boolean>(false);
  readonly toggleCollapse = output<void>();
  readonly categories = this.projectsService.getNavigation();
  private collapsedCats = signal<Record<string, boolean>>({});

  isCatOpen(title: string): boolean {
    return !this.collapsedCats()[title];
  }

  toggleCategory(title: string): void {
    this.collapsedCats.update(map => ({ ...map, [title]: !map[title] }));
  }
}
