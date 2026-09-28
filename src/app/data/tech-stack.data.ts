import { SkillCategory } from '../models/tech.model';

export const TECH_CATEGORIES: SkillCategory[] = [
  {
    title: 'Data Engineering & Pipelines',
    description: 'Extracción, orquestación, transformación y almacenamiento analítico.',
    skills: ['Apache Airflow', 'Apache Spark', 'dbt (Data Build Tool)', 'SQL Avanzado', 'Data Modeling', 'Parquet / Delta']
  },
  {
    title: 'Cloud & Infrastructure (IaC)',
    description: 'Aprovisionamiento declarativo y arquitecturas cloud resilientes.',
    skills: ['AWS (Lambda, S3, CloudWatch)', 'Serverless Framework', 'Terraform / IaC', 'Cloudflare Pages & DNS', 'Microservicios']
  },
  {
    title: 'DevOps & Containers',
    description: 'Automatización, integración continua y ambientes reproducibles.',
    skills: ['Docker & Docker Compose', 'Multi-stage Builds', 'GitHub Actions CI/CD', 'Linux / Bash Scripting', 'PowerShell Automation']
  },
  {
    title: 'Lenguajes & Herramientas',
    description: 'Tecnologías centrales de desarrollo y análisis.',
    skills: ['Python 3.x', 'TypeScript / Angular', 'Git & GitHub', 'REST APIs', 'Jupyter / Kaggle', 'Dockerfiles']
  }
];
