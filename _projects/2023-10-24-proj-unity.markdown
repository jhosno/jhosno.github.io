---
layout: project
title: "ProjUnity"
tag: projects
title-stilized: '<h1 class="text-5xl md:text-6xl font-black mb-6 leading-tight">
                    <span class="text-golden glitch">ProjUnity</span> 
                    <br/>
                    <span class="text-salmon">Marketplace de Recursos Digitales para Desarrolladores</span>
                </h1>'
featured: false
category: web app
status: 'Completado'
status-color: green
has-demo: false
demo: 'https://projunity.vercel.app'
date: 2023-10-24 15:00:00 -0400
has-quick-stats: true
quickStats:
  - icon: users
    title: Modelo de negocio
    value: C2C
  - icon: code
    title: Componentes reutilizables
    value: 25+
  - icon: zap
    title: Tiempo de carga
    value: <2s
stack: [Fullstack, Next.js, PostgreSQL, Express.js, NextUI, TailwindCSS, Redux, Mercado Pago]
assets-image-base-url: /assets/images/portfolio/projunity/
image: projunity_landing.jpeg
images: ['projunity_landing.jpeg', 'projunity_trending.jpeg', 'projunity_landing.jpeg', 'projunity_landing.jpeg']
has-testimonial: false
testimonials: []
type: "web app"
extract: "ProjUnity es un marketplace peer-to-peer que conecta desarrolladores freelancers para la compra y venta de recursos digitales y proyectos IT. Inspirado en la filosofía de itch.io, la plataforma empodera a creadores independientes permitiéndoles monetizar sus aplicaciones, componentes y herramientas con total autonomía sobre precios, presentación y términos de venta."
has-github: true
github: https://github.com/jhosnodev/projUnity
features:
  - icon: store
    title: Marketplace Descentralizado
    content: Sistema C2C donde cada desarrollador gestiona sus propios productos con páginas personalizables, precios flexibles y control total sobre términos de venta.
  - icon: user
    title: Perfiles de Desarrollador Completos
    content: Portfolios públicos con showcase de proyectos, historial de ventas, sistema de reputación y seguimiento de creadores favoritos.
  - icon: message-square
    title: Comunidad Activa
    content: Sistema de comentarios y valoraciones en proyectos, feed de novedades con actualizaciones de creadores, y notificaciones en tiempo real para engagement.
  - icon: credit-card
    title: Pagos Integrados
    content: Procesamiento de transacciones mediante Mercado Pago con generación automática de facturas en PDF y panel de analytics de ventas.
architecture:
  - icon: layout
    title: Frontend
    content: Next.js con App Router, NextUI para componentes UI, TailwindCSS para estilos utilitarios
  - icon: server
    title: Backend
    content: Express.js con arquitectura RESTful, PostgreSQL con modelado relacional optimizado
  - icon: workflow
    title: Estado Global
    content: Redux para manejo centralizado de estado con middleware para side effects
  - icon: shield
    title: Autenticación
    content: PassportJS con estrategias JWT y OAuth para autenticación segura y escalable
  - icon: cloud
    title: Infraestructura Cloud
    content: Cloudinary para gestión de assets multimedia, despliegue distribuido en Vercel (frontend) y Render (backend)
  - icon: file-text
    title: Generación de Documentos
    content: jsPDF para facturación automática con templates personalizables
  - icon: bar-chart
    title: Analytics
    content: Recharts para visualización de métricas de ventas y engagement
process:
  - title: Conceptualización & MVP
    content: Definición de alcance para proyecto grupal, research de plataformas similares (itch.io, Gumroad) y diseño de arquitectura inicial.
  - title: Desarrollo Colaborativo
    content: Metodología ágil con sprints coordinados, distribución de features por especialización y code reviews constantes.
  - title: Integración de Servicios
    content: Implementación de Mercado Pago SDK, configuración de Cloudinary y setup de infraestructura de deployment.
  - title: Testing & Refinamiento
    content: Pruebas de flujos críticos (compra, publicación, autenticación) y optimización de performance.
  - title: Deploy & Documentación
    content: Despliegue en producción con CI/CD y documentación técnica para mantenimiento futuro.

challenges:
  - challenge: Coordinación de Equipo Distribuido - Sincronización de trabajo entre múltiples desarrolladores con diferentes zonas horarias y estilos de código
    solution: Establecimiento de convenciones de código estrictas, implementación de Git flow con feature branches, y daily standups asíncronos mediante documentación compartida.
  - challenge: Arquitectura de Pagos Compleja - Integración de flujo completo de compra con Mercado Pago, incluyendo webhooks, manejo de estados de transacción y generación de facturas
    solution: Implementación de máquina de estados para tracking de órdenes, sistema de webhooks resiliente con retry logic, y generación automática de PDFs mediante templates dinámicos.
  - challenge: Gestión de Assets Multimedia - Manejo eficiente de uploads de imágenes, videos y archivos de proyectos sin comprometer performance
    solution: Integración de Cloudinary con transformaciones on-the-fly, lazy loading de contenido pesado y optimización de formatos (WebP, compresión automática).
  - challenge: UX de Marketplace Complejo - Balance entre autonomía del vendedor y experiencia consistente del comprador
    solution: Sistema de templates personalizables con constraints de diseño, preview en tiempo real de páginas de proyecto y guidelines de contenido para mantener calidad.
  - challenge: Estado Global en Aplicación Compleja - Sincronización de datos de usuario, carrito, notificaciones y productos sin prop drilling excesivo
    solution: Arquitectura Redux con slices modulares, selectors memoizados con Reselect para performance y middleware custom para side effects de API.

results: 
  - icon: rocket
    stat: MVP
    title: Lanzado en 3 meses
  - icon: package
    stat: 50+
    title: Proyectos publicados en beta
  - icon: users
    stat: 100%
    title: Cobertura de flujos críticos
  - icon: code
    stat: 7
    title: Desarrolladores en equipo
  - icon: check-circle
    stat: 100%
    title: Integración Mercado Pago funcional

my_contribution:
  title: Frontend Lead & UI Designer
  content: >
    Lideré el área de frontend desde la conceptualización visual hasta la implementación técnica, siendo responsable del diseño de interfaz y la arquitectura del cliente. Mi enfoque fue crear un marketplace intuitivo que empoderara a desarrolladores mientras mantenía una experiencia de usuario coherente y profesional.
    
  features:
    • Diseño completo de la interfaz de usuario en Figma, incluyendo sistema de componentes, flujos de navegación y prototipos interactivos
    • Arquitectura frontend con Next.js (App Router) estableciendo patrones de componentes y estructura de proyecto escalable
    • Implementación del design system con NextUI y TailwindCSS, asegurando consistencia visual en toda la plataforma
    • Desarrollo de páginas críticas marketplace, perfiles de usuario, páginas de proyecto individuales y dashboard de vendedor
    • Integración de Redux para gestión de estado global (autenticación, carrito, notificaciones)
    • Implementación del sistema de comentarios y feed de actualizaciones con actualización optimista
    • Integración de Recharts para dashboard de analytics de ventas con visualizaciones interactivas
    • Optimización de assets con Cloudinary (lazy loading, responsive images, transformaciones automáticas)
    • Coordinación con equipo backend para definición de contratos de API mediante axios
    • Code reviews y establecimiento de estándares de código para el equipo frontend
    
    
  impact: El resultado fue una interfaz que equilibra la autonomía creativa de los vendedores con una experiencia de compra consistente, facilitando que el equipo validara el concepto del marketplace con usuarios reales durante la fase de MVP.
---
