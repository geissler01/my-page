export interface TechBadge {
  name: string;
  category: 'data' | 'cloud' | 'backend' | 'devops' | 'database';
  color?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}
