import { Project } from '../models/project.model';

export const DATA_ENGINEERING_PROJECTS: Project[] = [
  {
    id: 'dags-alzheimer',
    slug: 'dags-alzheimer',
    title: 'DAGs & Distributed Spark Pipeline',
    tagline: 'Orquestación de flujos de datos a gran escala con Airflow y Spark',
    category: 'data-engineering',
    status: 'Featured',
    stack: ['Python', 'Apache Airflow', 'Apache Spark', 'Docker', 'Parquet', 'SQL'],
    githubUrl: 'https://github.com/geissler01/dags-alzheimer',
    sections: [
      {
        id: 'contexto',
        title: 'Contexto & Desafío Clínico',
        body: 'Procesamiento y correlación distribuida de grandes volúmenes de datos biomédicos de investigación. El objetivo central fue garantizar idempotencia, control de reintentos y tolerancia a fallos.'
      },
      {
        id: 'metricas-spark',
        title: 'Rendimiento & Escala Distribuida',
        metrics: [
          { label: 'Procesamiento', value: 'Distribuido Spark' },
          { label: 'Ejecución', value: 'Multi-Task DAGs' },
          { label: 'Tolerancia a Fallos', value: 'Retry Idempotente' }
        ]
      },
      {
        id: 'arquitectura-pipeline',
        title: 'Flujo de Ingesta & Procesamiento',
        steps: [
          { name: 'Ingesta', tech: 'Python Hooks', description: 'Extracción programada de fuentes heterogéneas' },
          { name: 'Orquestación', tech: 'Apache Airflow', description: 'Programación de DAGs y dependencias' },
          { name: 'Transformación', tech: 'Apache Spark', description: 'Cálculo distribuido y limpieza de datasets' },
          { name: 'Almacenamiento', tech: 'Parquet Lake', description: 'Persistencia columnar optimizada' }
        ]
      },
      {
        id: 'definicion-dag',
        title: 'Definición del DAG de Orquestación',
        code: {
          language: 'python',
          filename: 'dags/alzheimer_etl_dag.py',
          code: `from airflow import DAG
from datetime import datetime, timedelta

default_args = {'owner': 'geisler', 'retries': 3, 'retry_delay': timedelta(minutes=5)}

with DAG('pipeline_spark_alzheimer', default_args=default_args, schedule='@daily') as dag:
    # Orchestrated tasks with Spark execution
    pass`
        }
      }
    ]
  },
  {
    id: 'elt-dbt-01',
    slug: 'elt-dbt-01',
    title: 'Modern ELT Pipeline with dbt',
    tagline: 'Modelado analítico y control de calidad de datos en SQL',
    category: 'data-engineering',
    status: 'Completed',
    stack: ['dbt', 'SQL', 'Python', 'Jinja', 'Data Modeling', 'Git'],
    githubUrl: 'https://github.com/geissler01/elt-dbt-01',
    sections: [
      {
        id: 'enfoque-elt',
        title: 'Enfoque de Modelado ELT',
        body: 'Transformación y gobernanza de datos bajo el paradigma moderno ELT utilizando dbt (data build tool), implementando modelos modulares por capas, documentación autogenerada y linaje claro.'
      },
      {
        id: 'capas-datos',
        title: 'Capas de Modelado (Staging a Marts)',
        steps: [
          { name: 'Extract & Load', tech: 'Raw Ingestion', description: 'Carga cruda al warehouse analítico' },
          { name: 'Staging', tech: 'dbt Staging', description: 'Tipado, limpieza y estandarización' },
          { name: 'Marts & Tests', tech: 'dbt Models', description: 'Modelado dimensional y aserciones de datos' }
        ]
      },
      {
        id: 'modelo-sql',
        title: 'Transformación SQL & Tests',
        code: {
          language: 'sql',
          filename: 'models/staging/stg_events.sql',
          code: `with source as (
    select * from {{ source('raw_data', 'events') }}
)
select id as event_id, cast(created_at as timestamp) as event_ts from source`
        }
      }
    ]
  }
];
