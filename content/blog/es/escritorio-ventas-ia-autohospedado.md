---
title: 'El escritorio de ventas es suyo: WhatsApp responde, la prospección agenda'
date: '2026-11-22'
updated: '2026-11-22'
slug: escritorio-ventas-ia-autohospedado
seoTitle: 'El escritorio de ventas es suyo'
description: 'Escritorio de ventas con IA autohospedado para firmas de servicios: DeskcommCRM responde WhatsApp, AgentSDR corre la prospección, y una persona aprueba todo.'
cluster: 'AI and Automation'
keyword: 'escritorio de ventas con IA autohospedado'
author: 'Manuel Diprés'
published: true
lang: es
translationOf: own-ai-sales-desk
takeaways:
  - 'DeskcommCRM es un CRM de código abierto con licencia MIT que corre en el VPS propio de la firma, donde agentes de IA responden, califican y venden por WhatsApp, sin suscripción y sin cobro por usuario.'
  - 'AgentSDR es un SDR con IA gratuito, con licencia MIT, que usted hospeda, y que corre campañas de correo, LinkedIn y WhatsApp desde un solo espacio, donde cada respuesta llega a una lista de Acción requerida y nada se envía hasta que una persona lo aprueba.'
  - 'El software no cuesta nada, pero el costo se traslada a los servicios que usted conecta, su servidor, sus buzones, Unipile, su uso de IA en OpenRouter y Resend, así que Dipriva construye el escritorio con la lista de aprobación y los respaldos incluidos.'
faq:
  - q: '¿Qué es DeskcommCRM?'
    a: 'DeskcommCRM es un CRM de código abierto con licencia MIT que corre en el servidor propio de la firma, donde agentes de IA responden, califican y venden por WhatsApp. Se instala en un VPS con Docker, necesita un dominio, una cuenta gratuita de Supabase y una clave de IA de OpenRouter, Anthropic u OpenAI, y conecta el número de WhatsApp de la firma por código QR durante la configuración o por el canal oficial de Meta.'
  - q: '¿Qué es AgentSDR?'
    a: 'AgentSDR es un SDR con IA gratuito, con licencia MIT, que usted hospeda. Corre secuencias de correo, campañas de LinkedIn y mensajes y llamadas de WhatsApp desde un solo espacio, con un CRM con IA que clasifica cada respuesta y redacta la contestación. Cada respuesta llega a una lista de Acción requerida, y nada se envía hasta que una persona lo aprueba.'
  - q: '¿El software es de verdad gratuito?'
    a: 'Sí para el software mismo. DeskcommCRM y AgentSDR son de código abierto con licencia MIT, sin usuarios, niveles ni cobros por contacto. Usted paga por su propio servidor, las cuentas que conecta y su propio uso de IA, así que el costo se traslada a los servicios que conecta en lugar de desaparecer.'
  - q: '¿Cuáles son los riesgos que hay que nombrar antes de instalar alguna de las dos herramientas?'
    a: 'La conexión de WhatsApp por QR de DeskcommCRM corre por WAHA, un protocolo no oficial, así que el riesgo de bloqueo es suyo, y el canal oficial de la nube es el camino para escalar. El nivel gratuito de Supabase no hace respaldos, así que la firma debe programar los suyos. AgentSDR es un proyecto muy joven, con su primer lanzamiento público el 6 de octubre de 2026, todavía antes de la versión 1.0, y la automatización de LinkedIn y WhatsApp trae riesgo de restricción de cuentas.'
sources:
  - url: 'https://github.com/melgarafael/deskcommcrm/blob/HEAD/README.en.md'
    publisher: 'GitHub'
    title: 'DeskcommCRM README.en.md'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'AI agents that answer, qualify and sell on WhatsApp'
  - url: 'https://github.com/melgarafael/deskcommcrm/blob/HEAD/README.en.md'
    publisher: 'GitHub'
    title: 'DeskcommCRM README.en.md'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'No subscription, no gated features, your data stays yours.'
  - url: 'https://frontiernow.dev/en/github/deskcommcrm/'
    publisher: 'Frontier Now'
    title: 'DeskcommCRM: AI agents run WhatsApp sales'
    published: '2026-09-30'
    retrieved: '2026-11-22'
    quote: 'Two WhatsApp paths: QR pairing through WAHA (multi-number, with anti-ban throttling, jitter and sending windows) or Meta official Cloud API with template approval and sync'
  - url: 'https://frontiernow.dev/en/github/deskcommcrm/'
    publisher: 'Frontier Now'
    title: 'DeskcommCRM: AI agents run WhatsApp sales'
    published: '2026-09-30'
    retrieved: '2026-11-22'
    quote: 'the repo sits at 4,270 stars as of September 30, 2026.'
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'AgentSDR is open source under the MIT License. There are no seats, tiers or per-contact fees, so a team of one pays the same as a team of ten: nothing for the software.'
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'No. The AI classifies replies and drafts answers, but nothing is sent until a person approves it. It applies a classification on its own only when it is confident (85% by default), and holds anything else as a proposal for you to accept or change.'
    figures: ['85%']
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'Sequences send on their own inside sending hours, replies from every channel land in one Action required queue, and the AI classifies each one and drafts an answer. Your job is to review drafts and send them, not to chase tabs.'
  - url: 'https://www.aiagentslist.io/agents/agentsdr'
    publisher: 'AIAgentsList'
    title: 'AgentSDR Review 2026: Open-Source, Self-Hosted AI SDR'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'A very young project: first public release on October 6, 2026, still pre-1.0, and the project says minor releases may include breaking changes'
---

Un escritorio de ventas con IA autohospedado es el trabajo que convierte dos herramientas nuevas de código abierto en una sola operación de ventas que la firma posee. Este artículo cubre DeskcommCRM, un CRM de código abierto donde agentes de IA manejan las ventas por WhatsApp, y AgentSDR, un SDR con IA gratuito que usted hospeda. Uno responde al cliente que escribió primero. El otro llega al prospecto que todavía no ha escuchado de usted. Ambos corren en el servidor propio de la firma, ambos redactan con IA, y ambos se detienen en una aprobación humana. Una firma de roofing o de servicios que usa ambas posee el escritorio en lugar de rentarlo por usuario.

## DeskcommCRM responde al cliente que escribió primero

Para firmas de roofing y servicios, el primer mensaje por lo general llega por WhatsApp. Un dueño de casa envía una foto de una filtración, pide un presupuesto, o pregunta cuándo puede ir una cuadrilla. La firma que responde primero por lo general gana el trabajo, y la firma que responde a medianoche por lo general todavía no existe. DeskcommCRM está construido para ese primer mensaje.

DeskcommCRM es un CRM de código abierto donde agentes de IA manejan sus ventas por WhatsApp. El proyecto se describe en una línea: agentes de IA que responden, califican y venden por WhatsApp. Los agentes viven dentro de un CRM que corre en el servidor propio de la firma, no en una nube de un proveedor. La misma línea agrega el punto comercial: sin suscripción, sin funciones bloqueadas, sus datos siguen siendo suyos. Es la alternativa abierta a Kommo, Octadesk e Intercom, y está escrita en TypeScript con licencia MIT. El repositorio tiene 4,270 estrellas al 30 de septiembre de 2026, según Frontier Now, que revisó el proyecto ese día.

La instalación es el camino principal, y es corta. El CRM se instala en un VPS con Docker con un solo comando, con 4 GB de RAM recomendados. Lo que la firma necesita tener a mano es un VPS con Docker, un dominio que apunte a él, una cuenta gratuita de Supabase, y una clave de IA, de OpenRouter, Anthropic u OpenAI. El instalador genera los secretos, aplica el esquema de la base de datos, crea el primer administrador, y levanta todo el sistema con HTTPS. Luego la firma conecta su número de WhatsApp, escaneando un código QR durante la configuración, o por el canal oficial de Meta. El agente responde desde ese número, dentro del CRM, con el embudo, la agenda y los contactos frente a él.

Lo que hace el agente es más que conversar. Los agentes llegan al CRM por MCP, así que el embudo, la agenda y los contactos son cosas que operan, no texto que imitan. Cada agente lleva una base de conocimiento por cliente, memoria de la organización, y habilidades ejecutables. Cuando algo necesita una persona, abre un caso, sigue hablando con el cliente mientras espera, y toda la entrega queda auditada. El seguimiento revive una conversación fría con tiempos adaptables, según la etapa del embudo, y una pantalla de radar enumera los hilos en riesgo de morir sin respuesta. Las conversaciones resueltas se convierten en conocimiento nuevo, y las propuestas de mejora del propio agente solo se aplican después de que una persona las aprueba. Ese último punto importa: el agente sugiere, la persona aprueba, y la mejora llega como una versión nueva.

El proyecto nació como un CRM de comercio electrónico, y la comunidad de código abierto lo llevó más lejos. Hoy corre en clínicas, agencias de bienes raíces, negocios de infoproductos, agencias, tiendas y proveedores de servicios, cualquier negocio que venda por WhatsApp. Una firma de roofing tiene la misma forma: el cliente escribe primero, el agente responde, califica y agenda, y la cuadrilla atiende solo los casos que el agente abrió.

Dos advertencias pertenecen aquí, dichas con claridad. Primero, la conexión de WhatsApp tiene dos caminos, y no son iguales. Dos caminos de WhatsApp: emparejamiento por QR a través de WAHA (varios números, con limitación anti-bloqueo, variación y ventanas de envío) o la API oficial en la nube de Meta con aprobación de plantillas y sincronización. La ruta por QR es un protocolo no oficial. Está limitada y variada para reducir bloqueos, pero el riesgo es suyo, y la API oficial en la nube es el camino para escalar. Una firma que planea correr su número principal en DeskcommCRM debe usar el canal oficial, y guardar la ruta por QR para un piloto o un segundo número. Segundo, el nivel gratuito de Supabase no hace respaldos, así que la firma debe programar su propio respaldo diario. El instalador trae un comando de respaldo para eso, y la ruta de actualización toma un respaldo antes de cada actualización, pero el respaldo diario es trabajo de la firma. Tercero, la interfaz y la mayoría de los documentos están en portugués, aunque el README existe en inglés y español. Una firma bilingüe leerá el README sin problema y se encontrará con portugués en la interfaz, así que la configuración debe hacerla alguien cómodo con eso, o con la guía en inglés abierta al lado.

## AgentSDR llega al prospecto que no ha escuchado de usted

La prospección es el otro lado del escritorio. Una firma que solo responde lo que entra espera a que suene el teléfono. Una firma que también hace prospección elige a sus próximos clientes. AgentSDR es el lado de la prospección, y está construido para un fundador o un equipo pequeño que hace su propia prospección, no para un centro de llamadas.

AgentSDR es un SDR con IA gratuito, con licencia MIT, que usted hospeda. Corre campañas de correo, LinkedIn y WhatsApp desde una sola base de datos de prospectos, enriquece listas con sus propias cuentas de proveedores de datos, y tiene un CRM con IA que clasifica cada respuesta y redacta la contestación para que una persona la apruebe. Le sirve a fundadores, agencias y equipos pequeños de ventas que quieren poseer su sistema de prospección y están dispuestos a conectar y pagar por los servicios que lo sostienen.

El espacio de trabajo es un solo lugar para tres canales. Un espacio para campañas de correo, LinkedIn y WhatsApp. Una lista de Acción requerida, cada respuesta clasificada con un borrador adjunto. Un registro por persona, sin importar por qué canal responda. Una persona es un solo registro en todos los canales, así que una respuesta por correo, LinkedIn o WhatsApp marca sus inscripciones de campaña como respondidas, y la firma deja de escribirle a alguien que ya respondió.

El día se ve así. Las secuencias se envían solas dentro de las horas de envío, las respuestas de cada canal llegan a una lista de Acción requerida, y la IA clasifica cada una y redacta una respuesta. Su trabajo es revisar borradores y enviarlos, no perseguir pestañas. Esa frase es toda la descripción del trabajo para la persona que lo maneja: unos minutos al día en la lista, aprobando borradores que ya están clasificados y basados en los precios y notas de agenda propios de la firma.

La regla de aprobación es el punto de la herramienta, y está dicha con claridad en la página de AgentSDR. No. La IA clasifica respuestas y redacta contestaciones, pero nada se envía hasta que una persona lo aprueba. Aplica una clasificación por su cuenta solo cuando tiene confianza (85% por defecto), y guarda lo demás como una propuesta para que usted la acepte o la cambie. La IA puede mover a un prospecto hacia adelante en el embudo por su cuenta cuando tiene confianza, y marca a una persona como No Contactar de inmediato cuando pide que no le escriban más. Los movimientos hacia atrás, las llamadas de baja confianza, y cada Cliente nuevo quedan en manos de una persona. La persona sigue a cargo de lo que sale, y la lista es donde ese cargo se ejerce.

La configuración es una aplicación y una base de datos PostgreSQL, iniciadas por el archivo Docker Compose del proyecto. Después de eso, cada servicio se conecta desde páginas de Configuración guiadas: Google Workspace para los buzones, Unipile para LinkedIn y WhatsApp, OpenRouter para la clave de IA, y Cloudflare R2 para las grabaciones de llamadas. El agente de IA también puede llamar a prospectos por WhatsApp, agendar reuniones por Cal.com, y perseguir a los que dijeron que sí.

Dos advertencias pertenecen aquí también. Primero, el proyecto es muy joven. Un proyecto muy joven: primer lanzamiento público el 6 de octubre de 2026, todavía antes de la versión 1.0, y el proyecto dice que los lanzamientos menores pueden incluir cambios que rompen compatibilidad. Una firma debe correrlo en una campaña pequeña antes de mover todo su embudo, y debe esperar que las actualizaciones necesiten atención. Segundo, los canales de LinkedIn y WhatsApp traen riesgo de cuentas. Los propios documentos del proyecto dicen que el Acuerdo de Usuario de LinkedIn no permite mensajes automatizados y que cualquier automatización puede lograr que una cuenta sea restringida o bloqueada. WhatsApp también bloquea números que envían mensajes masivos no solicitados. Los valores por defecto son conservadores, 30 correos al día por buzón con un intervalo entre envíos, 30 invitaciones de LinkedIn al día en cuentas Premium y 5 en cuentas gratuitas, y envío solo dentro de horas de trabajo, y esos límites reducen el riesgo pero no lo eliminan. Una firma debe hacer prospección desde cuentas que pueda permitirse perder, o desde una identidad de envío dedicada, y nunca desde el LinkedIn personal del dueño o el número principal de WhatsApp.

## Un escritorio, dos lados de la conversación

Las dos herramientas se ven diferentes, y lo son. Una responde el WhatsApp que entra. La otra corre la prospección por correo, LinkedIn y WhatsApp. Pero el patrón es el mismo, y el patrón es el punto.

Primero, la firma posee el servidor. DeskcommCRM corre en el VPS de la firma, y las conversaciones nunca salen de su servidor. AgentSDR corre en el servidor de la firma, con prospectos y conversaciones en su propia base de datos PostgreSQL y grabaciones en su propio depósito de almacenamiento. Ningún proveedor guarda el embudo, y ningún proveedor fija el precio por usuario.

Segundo, la IA redacta, y la persona aprueba. Los agentes de DeskcommCRM responden y califican, y abren un caso cuando algo necesita una persona, con la entrega auditada. AgentSDR clasifica cada respuesta y redacta la contestación, y nada se envía hasta que una persona lo aprueba. En ambos casos la aprobación está integrada en el flujo de trabajo, no agregada después del hecho.

Tercero, la conversación es un solo registro. En DeskcommCRM, el agente trabaja el embudo, la agenda y los contactos por el CRM, así que el negocio se mueve en un solo lugar. En AgentSDR, una persona es un solo registro en todos los canales, así que una respuesta en cualquier lugar detiene la prospección en todas partes. En ambos casos la firma ve toda la conversación, no tres bandejas de entrada y una hoja de cálculo.

Ese patrón es la razón por la que las dos herramientas pertenecen a un mismo artículo. Una firma que compra un chatbot sin un CRM compra respuestas sin registro. Una firma que compra un SDR sin una lista de aprobación compra prospección sin control. Una firma que compra el patrón, servidor propio, borrador de IA, aprobación humana, compra velocidad con el registro y el control guardados.

## Software gratuito, servicios pagos: el costo honesto

La pregunta del costo es donde la mayoría de los artículos sobre herramientas gratuitas se equivocan, así que este artículo lo dice con claridad. El software no cuesta nada. El escritorio sí.

AgentSDR indica su costo en su propia página. AgentSDR es de código abierto con licencia MIT. No hay usuarios, niveles ni cobros por contacto, así que un equipo de una persona paga lo mismo que un equipo de diez: nada por el software. Luego enumera lo que la firma paga, en una tabla que este artículo repite aquí. La firma paga por su servidor y PostgreSQL, un proceso de aplicación y una base de datos, iniciados por Docker Compose. Paga por buzones de Google Workspace, los buzones que ya posee, para correo en frío. Paga por Unipile, las cuentas de LinkedIn y WhatsApp que conecta. Paga por uso de OpenRouter, su propia clave, para cada paso de IA, cobrado por el proveedor del modelo. Paga por Resend, para correos de inicio de sesión, restablecimiento de contraseña e invitaciones, requerido en producción.

DeskcommCRM indica la misma forma con otras palabras. Sin suscripción, sin funciones bloqueadas, sus datos siguen siendo suyos. La firma paga por el VPS, el dominio, la clave de IA, y su propio tiempo para correrlo. La cuenta de Supabase es gratuita, y el número de WhatsApp es el número propio de la firma, conectado por código QR o por el canal oficial de Meta. El costo que desaparece es la factura SaaS por usuario. El costo que queda es el servidor, las cuentas y el uso de IA, todos cobrados por sus propios proveedores, sin recargo de la herramienta.

Como ilustración, no como un resultado de cliente y no como una estadística: una firma de roofing instala DeskcommCRM en su VPS, conecta su número de WhatsApp, y entrena al agente en sus servicios, sus precios, y sus reglas de agenda. Un dueño de casa escribe por WhatsApp con una foto de una filtración. El agente responde, califica, y agenda la estimación, y la cuadrilla atiende el caso que el agente abrió. En la misma semana, la firma corre una campaña de AgentSDR a administradores de propiedades, desde sus propios buzones y cuentas de LinkedIn. Las respuestas llegan a una lista de Acción requerida. El dueño pasa unos minutos al día aprobando borradores, y las reuniones se agendan por Cal.com. La firma no contrató a una recepcionista para WhatsApp, y no contrató a un SDR para la prospección. Pasó su semana en estimaciones, en cuadrillas, y en las aprobaciones, que es el trabajo que solo la firma puede hacer. La ilustración sirve porque muestra el escritorio, no porque prometa un resultado. El resultado viene de la repetición, y la repetición viene de una lista con un aprobador con nombre y una hora diaria.

Ese es el argumento del costo, dicho sin jerga. Software gratuito no significa ventas gratuitas. Significa que la firma paga a los proveedores directamente, guarda sus datos en su propio servidor, y conserva la aprobación. Una firma que quiere ese trato debe contar los servicios conectados antes de instalar, no después. Una firma que no quiere ese trato debe comprar el usuario hospedado, y pagar para que otro corra el servidor.

## Dos riesgos que hay que nombrar antes de instalar

Ambas herramientas traen riesgos que la firma debe nombrar antes de instalar, no después de aprenderlos.

El primer riesgo es la cuenta. WhatsApp y LinkedIn restringen la automatización, y ambos pueden restringir o bloquear una cuenta que automatiza. El emparejamiento por QR de DeskcommCRM corre por WAHA, un protocolo no oficial, y el riesgo de bloqueo es suyo. La automatización de LinkedIn de AgentSDR corre contra el Acuerdo de Usuario de LinkedIn, y WhatsApp bloquea números que envían mensajes masivos no solicitados. La forma segura de correr ambas es separar las identidades: correr el número principal de WhatsApp en la API oficial en la nube, hacer prospección desde cuentas de envío dedicadas, y mantener el LinkedIn personal del dueño y el número principal fuera de la automatización por completo. Los límites integrados, 30 correos al día por buzón, 30 invitaciones de LinkedIn al día en cuentas Premium, y envío solo dentro de horas de trabajo, reducen el riesgo, y no lo eliminan.

El segundo riesgo es la edad de las herramientas. DeskcommCRM es la mayor de las dos, con miles de estrellas y cambios el mismo día de la revisión del 30 de septiembre, y una ruta de lanzamientos etiquetados para actualizaciones. AgentSDR tiene días de vida, con su primer lanzamiento público el 6 de octubre de 2026, todavía antes de la versión 1.0, con cambios que rompen compatibilidad ya en su primera semana. Una firma debe instalar DeskcommCRM como el escritorio y probar AgentSDR en una campaña pequeña, con un responsable con nombre, antes de mover todo su embudo. Un piloto que falla en una campaña pequeña cuesta una semana. Un despliegue que falla en todo el embudo cuesta el embudo.

El tercer riesgo es el respaldo, y pertenece a la firma. El nivel gratuito de Supabase no hace respaldos, así que la firma debe programar su propio respaldo diario de la base de datos de DeskcommCRM y las sesiones de WhatsApp. AgentSDR guarda sus prospectos y conversaciones en su propia base de datos PostgreSQL, y la firma también debe respaldarla. Un escritorio sin respaldo es un escritorio que puede perder cada conversación en una mala actualización. La ruta de actualización toma un respaldo antes de cada actualización, y eso no sustituye a un respaldo diario.

## Dipriva crea el escritorio para su firma

Este es el punto de venta, dicho con claridad: Dipriva puede ayudar a una firma de roofing o servicios a crear este escritorio y a usar la automatización dentro de él. DeskcommCRM entrega el escritorio de WhatsApp. AgentSDR entrega la prospección. Dipriva entrega la instalación, el entrenamiento, la lista de aprobación, y la entrega, para empresas de 10 a 500 empleados, incluidas firmas de roofing y servicios cuyos clientes escriben por WhatsApp primero.

El trabajo empieza con una auditoría de lo que la firma ya usa. Dipriva enumera los canales que usan los clientes, el número de WhatsApp y quién lo responde hoy, los servicios y precios que el agente debe conocer, las reglas de agenda, y las listas de prospección que la firma ya posee. Esa auditoría evita el error más común de configuración: entrenar a un agente con precios que la firma no ha escrito, o conectar una herramienta de prospección a una lista que la firma no ha limpiado, y luego mantener una versión más rápida del mismo desorden.

Luego, Dipriva configura el escritorio en el orden en que la firma lo va a usar. Primero, el VPS y la instalación de DeskcommCRM, con el dominio, la base de datos y el HTTPS en su lugar. Segundo, la conexión de WhatsApp, en el canal oficial para el número principal, con la ruta por QR guardada para un piloto o un segundo número. Tercero, el entrenamiento del agente, en los servicios de la firma, precios, reglas de agenda y casos de entrega, con la base de conocimiento versionada para que una respuesta mala se pueda rastrear hasta la nota de la que vino. Cuarto, la configuración de AgentSDR, con los buzones, las cuentas de Unipile, la clave de OpenRouter, y las reglas de envío en los valores conservadores por defecto. Quinto, la lista de aprobación, con un aprobador con nombre y una hora diaria, porque una lista sin hora fija no se trabaja. Sexto, los respaldos, programados a diario para ambas bases de datos, porque el escritorio solo es tan seguro como su último respaldo. Séptimo, las medidas, porque la firma necesita sus propios números para juzgar ambas herramientas: respuestas contestadas, prospectos calificados, reuniones agendadas, y borradores aprobados sin reescrituras.

El trabajo de Dipriva en esta área forma parte de sus [proyectos de IA y automatización](/es/servicios/ia-y-automatizacion/). El proyecto no es una venta de herramientas. Es una construcción de configuración y automatización, medida por si las respuestas de WhatsApp salen a tiempo, si los prospectos se califican, si las reuniones se agendan, si las aprobaciones ocurren cada día, y si el escritorio sigue en marcha después de que Dipriva se retire. Esas son medidas operativas, y son las medidas que el documento de entrega registra.

La hoja de ruta de ejecución de 90 días que usa Dipriva empieza con diagnóstico, luego priorización, luego construcción y luego entrega. El diagnóstico encuentra dónde se pierde venta: mensajes respondidos tarde, prospectos nunca calificados, seguimientos nunca enviados, y prospección que nunca empieza. La priorización elige los flujos que eliminan la mayor pérdida primero, no los flujos que se ven más impresionantes en una demostración. La construcción crea el escritorio, el entrenamiento del agente, y la lista. La entrega asigna un responsable con nombre y una fecha, para que la firma conserve el escritorio después de que Dipriva se retire. Una herramienta sin esa secuencia es una prueba. Una herramienta con esa secuencia es un sistema.

## Siete pasos que ponen el escritorio a trabajar

1. Audite los canales de ventas y enumere solo el número de WhatsApp, los servicios, los precios, y las reglas de agenda que el agente debe conocer. Escriba lo que falta antes de entrenar nada.
2. Configure el VPS, el dominio, y la base de datos, e instale DeskcommCRM en el servidor de la firma. Confirme que el sistema está en marcha con HTTPS antes de conectar WhatsApp.
3. Conecte WhatsApp en el canal oficial para el número principal. Guarde la ruta por QR para un piloto o un segundo número, y nunca corra el número principal en un protocolo no oficial.
4. Entrene al agente en los servicios de la firma, precios, y reglas de agenda, y pruébelo con diez mensajes reales de clientes antes de que responda uno en vivo. Corrija las respuestas que fallen, y versione la base de conocimiento.
5. Configure AgentSDR con los buzones, las cuentas de Unipile, la clave de OpenRouter, y las reglas de envío en los valores conservadores por defecto. Corra una campaña pequeña primero, y lea cada respuesta en la lista de Acción requerida.
6. Fije la rutina de aprobación a una hora cada día, con un aprobador con nombre, y programe un respaldo diario para ambas bases de datos. Una lista sin hora fija no se trabaja, y un escritorio sin respaldo puede perderlo todo.
7. Escriba el escritorio, capacite al equipo, y revíselo después del primer mes. Corrija el escritorio donde las respuestas se detengan o los borradores queden sin aprobar, luego entréguelo a los responsables con nombre, con fechas.

Esa lista es todo el escritorio en miniatura. No requiere un departamento nuevo, una contratación nueva, ni una factura SaaS por usuario. Requiere un servidor, un número de WhatsApp, un agente entrenado con precios reales, una lista con un aprobador con nombre, y un respaldo diario. Las firmas que completan esos siete pasos tienen un escritorio que poseen. Las firmas que los omiten tienen dos herramientas que solo pueden demostrar.

Si usted quiere ese escritorio creado para su firma, empiece con [Dónde automatizar primero](/es/ia-automatizacion/). Esa página es el paso inicial para el trabajo de IA y automatización en Dipriva. Desde allí, usted puede [agendar una sesión de estrategia de 30 minutos](/es/agendar/) y traer el número de WhatsApp, los servicios y precios, y el punto donde las respuestas se detienen hoy. Dipriva auditará ese flujo, creará el escritorio y su automatización en el orden anterior, y le entregará un flujo con responsables y fechas. DeskcommCRM responde WhatsApp. AgentSDR corre la prospección. Dipriva crea el escritorio que hace que ambas funcionen cada día.

Dipriva Consulting Group, 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507
