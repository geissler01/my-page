import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge" [class.highlight]="isHighlight()">
      {{ text() }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      font-size: 0.76rem;
      font-weight: 500;
      font-family: var(--font-mono);
      background: var(--bg-card);
      color: var(--accent-primary);
      border: 1px solid var(--border-color);
      transition: all 0.15s ease;
    }
    .badge:hover {
      border-color: var(--accent-primary);
      background: var(--accent-glow);
    }
    .badge.highlight {
      background: var(--accent-primary);
      color: var(--btn-cta-text);
      font-weight: 600;
      border-color: var(--accent-primary);
    }
  `]
})
export class BadgeComponent {
  readonly text = input.required<string>();
  readonly isHighlight = input<boolean>(false);
}
