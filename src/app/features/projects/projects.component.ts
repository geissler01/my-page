import { Component, inject, computed, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../data/projects.service';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';
import { CodePreviewComponent } from '../../shared/code-preview/code-preview.component';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SidebarComponent, BadgeComponent,
    StatCardComponent, CodePreviewComponent, IconComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private routeParams = toSignal(this.route.paramMap);
  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>;

  readonly isSidebarCollapsed = signal<boolean>(false);
  readonly activeSection = signal<string>('inicio');

  readonly project = computed(() => {
    const slug = this.routeParams()?.get('slug');
    if (slug) return this.projectsService.getProjectBySlug(slug);
    return this.projectsService.allProjects[0];
  });

  readonly tocItems = computed(() => {
    const p = this.project();
    if (!p) return [];
    return [
      { id: 'inicio', label: 'Resumen & Stack' },
      ...p.sections.map(s => ({ id: s.id, label: s.title })),
      { id: 'repositorio', label: 'Repositorio GitHub' }
    ];
  });

  constructor() {
    effect(() => {
      this.project();
      const container = this.scrollContainer?.nativeElement;
      if (container) {
        container.scrollTo({ top: 0, behavior: 'instant' });
      }
      this.activeSection.set('inicio');
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(c => !c);
  }

  scrollToSection(id: string): void {
    const container = this.scrollContainer?.nativeElement;
    const target = container?.querySelector(`#${id}`) as HTMLElement;
    if (container && target) {
      const topOffset = target.offsetTop - container.offsetTop - 15;
      container.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      this.activeSection.set(id);
    }
  }

  onScroll(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;
    const scrollPos = container.scrollTop + 90;
    for (const item of this.tocItems()) {
      const el = container.querySelector(`#${item.id}`) as HTMLElement;
      if (el && el.offsetTop <= scrollPos) {
        this.activeSection.set(item.id);
      }
    }
  }
}
