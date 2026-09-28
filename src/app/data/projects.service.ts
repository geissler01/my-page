import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { NavCategory } from '../models/navigation.model';
import { DATA_ENGINEERING_PROJECTS } from './data-engineering.data';
import { CLOUD_DEVOPS_PROJECTS } from './cloud-devops.data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly allProjects: Project[] = [
    ...DATA_ENGINEERING_PROJECTS,
    ...CLOUD_DEVOPS_PROJECTS
  ];

  getProjectBySlug(slug: string): Project | undefined {
    return this.allProjects.find(p => p.slug === slug);
  }

  getNavigation(): NavCategory[] {
    return [
      {
        title: 'DATA ENGINEERING',
        items: DATA_ENGINEERING_PROJECTS.map(p => ({
          label: p.title,
          route: `/projects/${p.slug}`,
          badge: p.status === 'Featured' ? 'Destacado' : undefined
        }))
      },
      {
        title: 'CLOUD & DEVOPS',
        items: CLOUD_DEVOPS_PROJECTS.map(p => ({
          label: p.title,
          route: `/projects/${p.slug}`,
          badge: p.status === 'Featured' ? 'Destacado' : undefined
        }))
      }
    ];
  }

  searchProjects(query: string): Project[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.allProjects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.stack.some(s => s.toLowerCase().includes(q))
    );
  }
}
