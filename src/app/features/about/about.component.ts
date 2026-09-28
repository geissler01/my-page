import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE_DATA } from '../../data/profile.data';
import { ProjectsService } from '../../data/projects.service';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, StatCardComponent, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly profile = PROFILE_DATA;
  private projectsService = inject(ProjectsService);
  readonly featuredProjects = this.projectsService.allProjects.filter(p => p.status === 'Featured');
}
