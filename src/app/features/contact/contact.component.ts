import { Component, signal } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent],
  template: `
    <article class="contact-page">
      <header class="doc-header">
        <h1 class="page-title">Contacto & Redes Profesionales</h1>
        <p class="page-subtitle">Canales directos para conectar o evaluar oportunidades técnicas.</p>
      </header>

      <div class="contact-grid">
        <div class="contact-card">
          <div class="card-icon"><app-icon name="server" [size]="24"></app-icon></div>
          <h2 class="card-title">Correo Electrónico</h2>
          <p class="card-desc">{{ profile.email }}</p>
          <div class="btn-group">
            <a [href]="'mailto:' + profile.email" class="primary-btn">Enviar Email</a>
            <button class="secondary-btn" (click)="copyEmail()">
              {{ copied() ? 'Copiado' : 'Copiar' }}
            </button>
          </div>
        </div>

        <div class="contact-card">
          <div class="card-icon"><app-icon name="linkedin" [size]="24"></app-icon></div>
          <h2 class="card-title">LinkedIn</h2>
          <p class="card-desc">Conecta en LinkedIn para networking profesional y colaboraciones.</p>
          <a [href]="profile.linkedin" target="_blank" rel="noopener" class="primary-btn">
            <span>Visitar LinkedIn</span>
            <app-icon name="external" [size]="14"></app-icon>
          </a>
        </div>

        <div class="contact-card">
          <div class="card-icon"><app-icon name="github" [size]="24"></app-icon></div>
          <h2 class="card-title">GitHub Profile</h2>
          <p class="card-desc">Explora mis más de 55 repositorios con código e infraestructura.</p>
          <a [href]="profile.github" target="_blank" rel="noopener" class="primary-btn">
            <span>Visitar GitHub</span>
            <app-icon name="external" [size]="14"></app-icon>
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .contact-page { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; display: flex; flex-direction: column; gap: 2rem; }
    .page-title { font-size: 2.2rem; font-weight: 800; color: var(--text-primary); }
    .page-subtitle { font-size: 1.05rem; color: var(--text-secondary); margin-top: 0.35rem; }
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
    .contact-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px;
      padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; box-shadow: var(--shadow-sm);
    }
    .contact-card:hover { border-color: var(--accent-primary); }
    .card-icon { color: var(--accent-primary); }
    .card-title { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); }
    .card-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45; flex: 1; }
    .btn-group { display: flex; gap: 0.5rem; }
    .primary-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
      background: var(--accent-primary); color: var(--btn-cta-text); font-weight: 600; padding: 0.5rem 1rem;
      border-radius: 6px; font-size: 0.85rem; box-shadow: var(--shadow-sm);
    }
    .secondary-btn {
      background: var(--bg-card-hover); border: 1px solid var(--border-color);
      color: var(--text-primary); font-weight: 500; padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.85rem;
    }
  `]
})
export class ContactComponent {
  readonly profile = PROFILE_DATA;
  readonly copied = signal<boolean>(false);

  copyEmail(): void {
    navigator.clipboard?.writeText(this.profile.email);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
