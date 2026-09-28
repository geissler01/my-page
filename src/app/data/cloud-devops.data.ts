import { Project } from '../models/project.model';

export const CLOUD_DEVOPS_PROJECTS: Project[] = [
  {
    id: 'iac-serverless-infra',
    slug: 'iac-serverless-infra',
    title: 'IaC & Serverless Cloud Architecture',
    tagline: 'Infraestructura como código y microservicios serverless en la nube',
    category: 'cloud-devops',
    status: 'Featured',
    stack: ['Python', 'Serverless', 'AWS Lambda', 'IaC', 'API Gateway', 'CloudWatch'],
    githubUrl: 'https://github.com/geissler01/IaC-Serverless-infra',
    sections: [
      {
        id: 'arquitectura-cloud',
        title: 'Arquitectura Serverless Bajo Demanda',
        body: 'Aprovisionamiento declarativo de infraestructura cloud sin servidores utilizando Python, Serverless Framework y AWS para microservicios efímeros que escalan automáticamente a cero costo en reposo.'
      },
      {
        id: 'metricas-iac',
        title: 'Eficiencia Operativa & Auto-Scaling',
        metrics: [
          { label: 'Escalabilidad', value: 'Auto-Scale Instantáneo' },
          { label: 'Costo Base', value: '$0 en Inactividad' },
          { label: 'Despliegues', value: '100% Declarativo' }
        ]
      },
      {
        id: 'flujo-serverless',
        title: 'Pipeline de Aprovisionamiento',
        steps: [
          { name: 'Definición IaC', tech: 'YAML / Serverless', description: 'Especificación declarativa de recursos' },
          { name: 'Compute', tech: 'AWS Lambda / Python', description: 'Microservicios reactivos por eventos' },
          { name: 'CI/CD Deploy', tech: 'GitHub Actions', description: 'Despliegues continuos sin downtime' }
        ]
      },
      {
        id: 'template-iac',
        title: 'Manifiesto Serverless Framework',
        code: {
          language: 'yaml',
          filename: 'serverless.yml',
          code: `service: serverless-data-api\nprovider:\n  name: aws\n  runtime: python3.11\nfunctions:\n  processEvent:\n    handler: handler.process_event\n    events:\n      - http:\n          path: /events\n          method: post`
        }
      }
    ]
  },
  {
    id: 'cluster-config',
    slug: 'cluster-config',
    title: 'Cluster Config & Multi-Service Setup',
    tagline: 'Orquestación de servicios y configuración declarativa de clusters',
    category: 'cloud-devops',
    status: 'Completed',
    stack: ['Docker', 'YAML', 'Bash', 'Networking', 'Cluster Architecture', 'Linux'],
    githubUrl: 'https://github.com/geissler01/cluster-config',
    sections: [
      {
        id: 'arquitectura-red',
        title: 'Arquitectura de Red Bridge & Multi-Nodo',
        body: 'Estructuras y manifiestos declarativos para aprovisionamiento, networking y despliegue homogéneo de servicios y clusters de datos con aislamiento estricto y volúmenes persistentes.'
      },
      {
        id: 'orquestacion-nodos',
        title: 'Topología & Contenedores',
        steps: [
          { name: 'Imágenes', tech: 'Multi-stage Docker', description: 'Imágenes mínimas con base Alpine' },
          { name: 'Networking', tech: 'Custom Bridge', description: 'Aislamiento de tráfico entre nodos' },
          { name: 'Orquestación', tech: 'Compose Manifests', description: 'Declaración de réplicas y variables' }
        ]
      },
      {
        id: 'compose-manifest',
        title: 'Manifiesto Compose Multi-Nodo',
        code: {
          language: 'yaml',
          filename: 'docker-compose.cluster.yml',
          code: `version: '3.8'\nservices:\n  worker-node:\n    image: custom-cluster-worker:latest\n    deploy:\n      replicas: 3\n    networks:\n      - internal-net\nnetworks:\n  internal-net:\n    driver: bridge`
        }
      }
    ]
  }
];
