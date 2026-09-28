import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  standalone: true,
  template: `
    <div class="code-wrapper">
      <div class="code-header">
        <span class="code-file">{{ filename() }}</span>
        <button class="copy-btn" (click)="copyCode()">
          {{ copied() ? 'Copiado' : 'Copiar' }}
        </button>
      </div>
      <pre class="code-body"><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: [`
    .code-wrapper {
      background: var(--code-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      margin: 1rem 0;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      box-shadow: var(--shadow-sm);
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: var(--code-header);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 0.78rem;
    }
    .copy-btn {
      color: var(--text-secondary);
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
      font-size: 0.75rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      transition: all 0.15s;
    }
    .copy-btn:hover {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
    }
    .code-body {
      padding: 1.1rem;
      overflow-x: auto;
      line-height: 1.55;
      color: var(--code-text);
    }
  `]
})
export class CodePreviewComponent {
  readonly filename = input.required<string>();
  readonly code = input.required<string>();
  readonly language = input<string>('text');
  readonly copied = signal<boolean>(false);

  copyCode(): void {
    navigator.clipboard?.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
