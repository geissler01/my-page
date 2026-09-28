export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureStep {
  name: string;
  tech: string;
  description: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  body?: string;
  steps?: ArchitectureStep[];
  code?: CodeSnippet;
  metrics?: ProjectMetric[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'data-engineering' | 'cloud-devops';
  status: 'Production' | 'Featured' | 'Completed' | 'Open Source';
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  sections: ProjectSection[];
}
