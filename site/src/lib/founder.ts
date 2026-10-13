/**
 * Founder profile, English and Spanish. Biography facts are ported from the live
 * page (client/src/pages/AboutManuelDipres.tsx) and nothing is added to them:
 * 20+ years, revenue operations, sales enablement programs and go-to-market
 * systems, cross-functional teams across the Americas and Europe, startups and
 * mid-market businesses, English and Spanish. No portrait: the page is faceless.
 * Client results and standards come from copy.ts so they stay worded as approved.
 */
import type { Lang } from './copy';

export const founder = {
  en: {
    meta: {
      title: 'Manuel Diprés, Founder | Dipriva Consulting Group',
      description:
        'Manuel Diprés founded Dipriva Consulting Group after more than 20 years building revenue operations and go-to-market systems. He works in English and Spanish.',
    },
    crumbs: { home: 'Home', about: 'About', name: 'Manuel Diprés' },
    eyebrow: 'Founder',
    h1: 'Manuel Diprés',
    role: 'Founder, Dipriva Consulting Group',
    linkedin: 'Manuel on LinkedIn',
    inShortLabel: 'In short',
    inShort:
      'Manuel Diprés is the founder of Dipriva Consulting Group, a consulting firm that delivers corporate strategy, startup operations and AI automation to companies with 10 to 500 employees, built around a 90-day execution roadmap. He brings more than 20 years of experience building revenue operations, sales enablement programs and go-to-market systems, with cross-functional teams across the Americas and Europe. He works in English and Spanish with companies across the United States and its territories, from Dipriva’s base in West Michigan.',
    background: {
      label: 'Background',
      h2: 'More than 20 years building the systems that carry revenue.',
      body: [
        'Manuel Diprés brings more than 20 years of global experience building revenue operations, sales enablement programs and go-to-market systems at scale. He has led cross-functional teams across the Americas and Europe.',
        'His approach centers on engineering operational clarity: closing the gap between strategic intent and the infrastructure required to execute it. He delivers precise, scalable solutions for startups and mid-market businesses, so high-growth ambitions are backed by disciplined execution.',
        'He delivers consulting services in English and Spanish.',
      ],
      factsLabel: 'Profile',
      facts: [
        { term: 'Role', value: 'Founder, Dipriva Consulting Group' },
        { term: 'Experience', value: '20+ years in revenue operations, sales enablement and go-to-market systems' },
        { term: 'Teams led', value: 'Cross-functional teams across the Americas and Europe' },
        { term: 'Languages', value: 'English and Spanish' },
        { term: 'Works with', value: 'Companies with 10 to 500 employees across the United States and its territories' },
        { term: 'Based in', value: 'West Michigan' },
      ],
    },
    approach: {
      label: 'Approach',
      body: 'Every engagement starts with one question: where is the gap between what the business intends to do and what its infrastructure can support? From that diagnosis, Dipriva architects the systems, processes and execution frameworks that close it. No theoretical deliverables.',
    },
    results: { label: 'Client results' },
    services: {
      label: 'Services',
      h2: 'Three service lines. One standard of execution.',
      explore: 'Explore',
    },
    cta: {
      h2: 'Work with Manuel.',
      body: 'If your business needs operational clarity and an execution system that holds under pressure, start with a conversation.',
      button: 'Schedule a Strategy Session',
    },
  },
  es: {
    meta: {
      title: 'Manuel Diprés, fundador | Dipriva Consulting Group',
      description:
        'Manuel Diprés fundó Dipriva Consulting Group después de más de 20 años construyendo operaciones de ingresos y sistemas comerciales. Trabaja en inglés y en español.',
    },
    crumbs: { home: 'Inicio', about: 'Nosotros', name: 'Manuel Diprés' },
    eyebrow: 'Fundador',
    h1: 'Manuel Diprés',
    role: 'Fundador, Dipriva Consulting Group',
    linkedin: 'Manuel en LinkedIn',
    inShortLabel: 'En resumen',
    inShort:
      'Manuel Diprés es el fundador de Dipriva Consulting Group, una firma de consultoría en estrategia corporativa, operaciones de startups y automatización con IA para empresas de 10 a 500 empleados, organizada en torno a una hoja de ruta de ejecución de 90 días. Tiene más de 20 años de experiencia construyendo operaciones de ingresos, programas de habilitación de ventas y sistemas comerciales, con equipos multifuncionales en las Américas y Europa. Trabaja en inglés y en español con empresas de todo Estados Unidos y sus territorios, desde la sede de Dipriva en West Michigan.',
    background: {
      label: 'Trayectoria',
      h2: 'Más de 20 años construyendo los sistemas que sostienen los ingresos.',
      body: [
        'Manuel Diprés tiene más de 20 años de experiencia internacional construyendo operaciones de ingresos, programas de habilitación de ventas y sistemas comerciales a escala. Ha dirigido equipos multifuncionales en las Américas y Europa.',
        'Su enfoque es diseñar claridad operacional: cerrar la brecha entre la intención estratégica y la infraestructura necesaria para ejecutarla. Entrega soluciones precisas y escalables para startups y empresas medianas, de modo que las ambiciones de alto crecimiento cuenten con una ejecución disciplinada.',
        'Presta servicios de consultoría en inglés y en español.',
      ],
      factsLabel: 'Perfil',
      facts: [
        { term: 'Cargo', value: 'Fundador, Dipriva Consulting Group' },
        { term: 'Experiencia', value: 'Más de 20 años en operaciones de ingresos, habilitación de ventas y sistemas comerciales' },
        { term: 'Equipos dirigidos', value: 'Equipos multifuncionales en las Américas y Europa' },
        { term: 'Idiomas', value: 'Inglés y español' },
        { term: 'Trabaja con', value: 'Empresas de 10 a 500 empleados en todo Estados Unidos y sus territorios' },
        { term: 'Sede', value: 'West Michigan' },
      ],
    },
    approach: {
      label: 'Enfoque',
      body: 'Cada proyecto empieza con una pregunta: ¿dónde está la brecha entre lo que la empresa se propone hacer y lo que su infraestructura puede sostener? A partir de ese diagnóstico, Dipriva diseña los sistemas, procesos y marcos de ejecución que la cierran. Sin entregables teóricos.',
    },
    results: { label: 'Resultados con clientes' },
    services: {
      label: 'Servicios',
      h2: 'Tres líneas de servicio. Un mismo estándar de ejecución.',
      explore: 'Ver',
    },
    cta: {
      h2: 'Trabaje con Manuel.',
      body: 'Si su empresa necesita claridad operacional y un sistema de ejecución que resista la presión, empiece con una conversación.',
      button: 'Agende una sesión estratégica',
    },
  },
} satisfies Record<Lang, unknown>;
