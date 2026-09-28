import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../core/search.service';
import { ProjectsService } from '../../data/projects.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [IconComponent],
  template: `
    @if (searchService.isModalOpen()) {
      <div class="search-backdrop" (click)="searchService.close()"></div>
      <div class="search-dialog" role="dialog" aria-modal="true">
        <div class="search-input-box">
          <app-icon name="search" [size]="18"></app-icon>
          <input
            #searchInput
            type="text"
            placeholder="Buscar tecnología, pipeline, cloud o proyecto..."
            [value]="searchService.searchQuery()"
            (input)="onSearchInput($event)"
            autofocus
          />
          <button class="esc-btn" (click)="searchService.close()">ESC</button>
        </div>

        <div class="search-results">
          @if (results.length > 0) {
            <ul class="results-list">
              @for (item of results; track item.id) {
                <li (click)="selectProject(item.slug)" class="result-item">
                  <div class="result-title">{{ item.title }}</div>
                  <div class="result-desc">{{ item.tagline }}</div>
                  <div class="result-tags">
                    @for (tech of item.stack.slice(0, 4); track tech) {
                      <span class="tag">{{ tech }}</span>
                    }
                  </div>
                </li>
              }
            </ul>
          } @else if (searchService.searchQuery().trim()) {
            <div class="no-results">No se encontraron resultados para "{{ searchService.searchQuery() }}"</div>
          } @else {
            <div class="search-hint">Escribe "Airflow", "Docker", "IaC", "dbt" o "Spark"...</div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .search-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 110; backdrop-filter: blur(4px); }
    .search-dialog {
      position: fixed; top: 15%; left: 50%; transform: translateX(-50%); width: 90%; max-width: 580px;
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px;
      box-shadow: var(--shadow-md); z-index: 120; overflow: hidden; animation: popIn 0.2s ease-out;
    }
    @keyframes popIn { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
    .search-input-box { display: flex; align-items: center; padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); gap: 0.75rem; color: var(--text-muted); }
    .search-input-box input {
      flex: 1; background: transparent; border: none; outline: none; font-size: 1rem; color: var(--text-primary); font-family: inherit;
    }
    .esc-btn { font-size: 0.7rem; background: var(--bg-card-hover); border: 1px solid var(--border-color); color: var(--text-muted); padding: 0.2rem 0.4rem; border-radius: 4px; }
    .search-results { max-height: 350px; overflow-y: auto; padding: 0.5rem; }
    .results-list { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
    .result-item { padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background 0.15s; }
    .result-item:hover { background: var(--bg-card-hover); }
    .result-title { font-weight: 600; color: var(--accent-primary); font-size: 0.95rem; }
    .result-desc { font-size: 0.8rem; color: var(--text-secondary); margin: 0.2rem 0 0.4rem; }
    .result-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }
    .tag { font-size: 0.7rem; font-family: var(--font-mono); background: var(--bg-canvas); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--text-muted); border: 1px solid var(--border-color); }
    .no-results, .search-hint { padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.88rem; }
  `]
})
export class SearchModalComponent {
  readonly searchService = inject(SearchService);
  private projectsService = inject(ProjectsService);
  private router = inject(Router);

  get results() {
    return this.projectsService.searchProjects(this.searchService.searchQuery());
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchService.setQuery(input.value);
  }

  selectProject(slug: string): void {
    this.router.navigate(['/projects', slug]);
    this.searchService.close();
  }
}
