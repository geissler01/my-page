import { Component } from '@angular/core';
import { TECH_CATEGORIES } from '../../data/tech-stack.data';
import { BadgeComponent } from '../../shared/badge/badge.component';

@Component({
  selector: 'app-stack-matrix',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <article class="doc-page">
      <header class="doc-header">
        <h1 class="page-title">Matriz de Habilidades & Stack Técnico</h1>
        <p class="page-subtitle">Herramientas, frameworks y tecnologías dominadas para entornos de producción.</p>
      </header>

      <div class="categories-grid">
        @for (cat of categories; track cat.title) {
          <div class="category-card">
            <h2 class="cat-title">{{ cat.title }}</h2>
            <p class="cat-desc">{{ cat.description }}</p>
            <div class="skills-wrapper">
              @for (skill of cat.skills; track skill) {
                <app-badge [text]="skill"></app-badge>
              }
            </div>
          </div>
        }
      </div>
    </article>
  `,
  styles: [`
    .doc-page { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; display: flex; flex-direction: column; gap: 2rem; }
    .page-title { font-size: 2.2rem; font-weight: 800; color: var(--text-primary); }
    .page-subtitle { font-size: 1.05rem; color: var(--text-secondary); margin-top: 0.35rem; }
    .categories-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; }
    .category-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px;
      padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; box-shadow: var(--shadow-sm);
    }
    .category-card:hover { border-color: var(--accent-primary); }
    .cat-title { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); }
    .cat-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.45; }
    .skills-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
  `]
})
export class StackMatrixComponent {
  readonly categories = TECH_CATEGORIES;
}
