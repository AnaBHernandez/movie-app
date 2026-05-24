# PRODUCT_LOG: BITÁCORA DE INGENIERÍA DE PRODUCTO - MOVIE-APP (2026)

Este documento registra cronológicamente las decisiones de arquitectura, resolución de incidencias críticas de infraestructura y la evolución de los entregables de software dentro del ecosistema del proyecto.

---

## [2026-05-24] - MITIGACIÓN DE ENTORNOS DE CONTROL Y GOBERNANZA GIT

- **PROBLEMA:** El desarrollo de software sin control de versiones aislado expone al ecosistema a regresiones de código, fallos de indexación masiva de dependencias y pérdida de trazabilidad ante borrados accidentales en el sistema operativo.
- **MVP:** Inicialización del entorno Git local en el directorio de desarrollo del proyecto, bifurcando el árbol de cambios inmediatamente hacia la rama aislada `feature/u4-enrutamiento-base` bajo la metodología de desarrollo guiado por especificaciones (SDD).
- **QA-IA:** Verificación socrática del aislamiento de ramas del repositorio. Certificación de la presencia de los centinelas documentales en la raíz para habilitar las compuertas automáticas de calidad en la nube.

---

## [2026-05-24] - PURGA DE ARTEFACTOS NPM Y ENFORCEMENT DE SEGURIDAD CON PNPM

- **PROBLEMA:** La inicialización por defecto de la CLI de Angular inyecta configuraciones y lockfiles acoplados a npm, induciendo riesgos de vulnerabilidad por dependencias fantasma (Phantom Dependencies) e interrumpiendo el flujo de empaquetamiento optimizado de pnpm v11.
- **MVP:** Eliminación física total de remanentes heredados (`package-lock.json`) y parametrización explícita de la directiva `"packageManager": "pnpm@11.0.0"` dentro del manifiesto de configuración `package.json`, liberando el entorno de las restricciones de motor.
- **QA-IA:** Verificación sintáctica del manifiesto JSON de dependencias. Certificación del uso exclusivo del gestor seguro para la orquestación del árbol de módulos local.

---

## [2026-05-24] - RESOLUCIÓN DE CONFLICTO DE PATH BAJO CONTENEDOR VS CODE SNAP

- **PROBLEMA:** La ejecución de comandos globales de aprovisionamiento de runtime (`pnpm env use --global`) colisiona contra las políticas de aislamiento de escritura de los paquetes Snap en Ubuntu 24.04 LTS, interrumpiendo el flujo de descarga al no poder alterar el $PATH del sandbox.
- **MVP:** Omisión de la gestión de entornos de pnpm mediante el aprovechamiento directo del motor de ejecución Node v22.22.2 previamente administrado e inyectado a nivel de sistema operativo por NVM, logrando completar la instalación local de paquetes.
- **QA-IA:** Diagnóstico de aislamiento forense de sistemas Unix. Certificación de la descarga exitosa del árbol de dependencias lógicas de Angular 21 sin corromper las variables de entorno locales.

---

## [2026-05-24] - ENRUTAMIENTO ESTÁTICO NATIVO Y RESOLUCIÓN DE COMPILACIÓN ZONELESS

- **PROBLEMA:** La sobrecarga analítica de Zone.js interceptando eventos del DOM degrada el rendimiento de renderizado en el cliente, mientras que las directivas de navegación mal inyectadas en componentes standalone bloquean la compilación del software en el entorno local.
- **MVP:** Implementación del mapa de ruteo asíncrono para la Actividad 1 de la Unidad 4 utilizando carga perezosa estricta por exportaciones nombradas (`.then()`). Activación del motor Zoneless estable mediante `provideZonelessChangeDetection()` y resolución de directivas en el componente standalone raíz (`App`).
- **QA-IA:** Análisis de trazas mediante el compilador `ngtsc`. Corrección del layout de distribución de TypeScript forzando el parámetro `"rootDir": "src"` en `tsconfig.app.json` para neutralizar conflictos de empaquetamiento y estabilizar el servidor de desarrollo local.

## [2026-05-24] - REFACTORIZACIÓN A LAYOUT ANIDADO JERÁRQUICO Y CONTROL DE ERRORES 404

- **PROBLEMA:** La duplicación de interfaces de navegación en múltiples vistas o su inserción permanente en la raíz monolítica de la aplicación degrada la mantenibilidad del código e inyecta menús redundantes en escenarios de error de ruta.
- **MVP:** Mutación de la arquitectura de enrutamiento lineal a una estructura arbórea jerárquica mediante la directiva `children` en `app.routes.ts`, delegando la barra de navegación al componente standalone `Layout` y aislando la ruta comodín `**`.
- **QA-IA:** Verificación forense del flujo de proyección de vistas mediante el doble anidamiento de `<router-outlet>`. Certificación de la ausencia de regresiones visuales en el servidor de desarrollo y validación final de spec.md bajo la supervisión del Auditor Central.

## [2026-05-24] - ACTIVACIÓN DEL ENTORNO LOCAL Y RAMIFICACIÓN DE CARACTERÍSTICAS HTTP

- **PROBLEMA:** Ejecutar instalaciones de dependencias y pruebas de runtime directamente sobre la rama principal `main` viola las políticas de flujo de trabajo industrial, exponiendo la base estable a bloqueos operacionales innecesarios.
- **MVP:** Creación de la rama de trabajo `feature/http` para la Unidad 5, seguida de la hidratación del árbol de dependencias físicas vía `pnpm install` y el arranque exitoso del servidor en el puerto 4200.
- **QA-IA:** Verificación del prompt de la shell en la rama de características. Certificación de la correcta generación de `node_modules` libres de firmas de npm y validación estricta de límites en spec.md bajo la supervisión del Auditor Central.

## [2026-05-24] - MITIGACIÓN DE INSTALACIÓN INLINE MEDIANTE FORZADO DE STORE-DIR EN UNIX

- **PROBLEMA:** El motor de empaquetado de pnpm v11 interrumpe la adición de dependencias de desarrollo (`pnpm add -D`) debido a la colisión de firmas de almacenamiento virtual entre el entorno anfitrión de Ubuntu y el sandbox de VS Code Snap.
- **MVP:** Ejecución del comando de instalación inyectando el modificador explícito `--store-dir` apuntando al almacén nativo del sistema, logrando el bypass del contenedor e instalando el núcleo de TailwindCSS.
- **QA-IA:** Certificación de consistencia en el árbol de enlaces simbólicos. Verificación de la compilación limpia sin advertencias secundarias en la terminal de desarrollo local bajo supervisión del Auditor Central.

## [2026-05-24] - ACTUALIZACIÓN DE PIPELINE DE ESTILOS PARA ADAPTACIÓN A TAILWIND v4

- **PROBLEMA:** El uso directo de `tailwindcss` como plugin de PostCSS arroja una excepción crítica de detención de build debido a la reestructuración arquitectónica global de la versión Tailwind v4.3.0.
- **MVP:** Adición del paquete conector `@tailwindcss/postcss` mediante forzado de almacén local y remapeo de directivas en el manifiesto `postcss.config.js`.
- **QA-IA:** Certificación de código de salida exitoso (exit code 0) en el proceso de serve de Angular 21. Validación del pipeline de compilación asíncrona libre de alertas.

## [2026-05-24] - PURGA COMPLETA DE NODE_MODULES Y UNIFICACIÓN DE ALMACÉN PORTÁTIL

- **PROBLEMA:** El motor de pnpm v11 lanza de forma persistente la excepción `[ERR_PNPM_UNEXPECTED_STORE]` al detectar colisiones de trazabilidad entre enlaces del sistema global y solicitudes de almacenamiento relativo inline dentro del mismo directorio de dependencias.
- **MVP:** Remoción absoluta del directorio `node_modules` para eliminar el histórico de enlaces y ejecución de un ciclo de aprovisionamiento unificado (instalación de paquetes CSS y dependencias de Angular 21) bajo la directiva única `--store-dir .pnpm-store`.
- **QA-IA:** Certificación de consistencia estructural en el árbol de módulos local. Eliminación total de excepciones de transporte en el compilador de estilos de la SPA.

## [2026-05-24] - MITIGACIÓN DE EXCEPCIÓN DE BUILDS IGNORADOS EN ENTORNO PORTÁTIL

- **PROBLEMA:** El motor de pnpm v11 activa políticas de aislamiento preventivo (`ERR_PNPM_IGNORED_BUILDS`), bloqueando la compilación de scripts nativos de empaquetado de Angular (`esbuild`, `@parcel/watcher`) en el almacén local.
- **MVP:** Inyección del nodo de seguridad `onlyBuiltDependencies` dentro del manifiesto descriptor `package.json`, autorizando los ciclos de vida nativos y consolidando la restauración del entorno bajo la directiva `--store-dir .pnpm-store`.
- **QA-IA:** Certificación de transiciones en verde bajo `ngtsc`. Verificación del correcto funcionamiento del servidor local en modo escucha sin bloqueos del sistema de ficheros de Linux.

## [2026-05-24] - DECOUPLED UI RENDERING VIA RUNTIME CDN BYPASS

- **PROBLEMA:** Los bloqueos persistentes de escritura por políticas de sandbox del contenedor VS Code Snap impiden la compilación local del compilador esbuild/PostCSS.
- **MVP:** Eliminación completa de archivos lógicos de configuración huérfanos e inyección del motor dinámico runtime de TailwindCSS mediante CDN directamente en el nodo principal de `index.html`.
- **QA-IA:** Certificación de compilación limpia con cero (0) warnings y cero (0) errores en la consola de comandos de Angular 21. Renderizado responsivo verificado en entorno real de navegador.

## [2026-05-24] - RESOLUCIÓN DE ENLAZADO DINÁMICA MEDIANTE SWITCHMAP EN VISTAS DETALLE

- **PROBLEMA:** La vista de detalles (`/movies/:id`) inicializaba una plantilla vacía debido a la ausencia de peticiones reactivas vinculadas al parámetro de ruta inyectado.
- **MVP:** Implementación del patrón combinatorio `toObservable(id).pipe(switchMap(...))` conectado al cliente HTTP del servicio, resolviendo el modelo de datos de la película de forma asíncrona.
- **QA-IA:** Certificación de mapeo dinámico en el DOM. Flujo completo de navegación (Lista -> Detalle -> Retorno) operando al 100% bajo estándares de Angular 21.

## [2026-05-24] - DECOUPLING ROUTER INPUTS VIA DIRECT ACTIVATEDROUTE STREAMING

- **PROBLEMA:** Bloqueo del ciclo de hidratación por desajuste sintáctico en el mapeo automático de inputs de rutas independientes.
- **MVP:** Sustitución de `input.required()` por el flujo reactivo nativo `ActivatedRoute.paramMap`, implementando un extractor fallback de contingencia (`id || movieId`).
- **QA-IA:** Certificación de lectura síncrona de parámetros directamente del segmento de la URL activa.

## [2026-05-24] - TYPE CASTING SANITIZATION FOR ROUTE PARAMETER STREAMS

- **PROBLEMA:** Excepción de compilación estática (TS2345) debido a la firma de retorno nullable (`string | null`) de la API nativa de `ParamMap` de Angular.
- **MVP:** Inyección de un fallback síncrono por cortocircuito (`|| ''`) en el operador `map` para forzar la inferencia pura del tipo primitivo `string`.
- **QA-IA:** Compilación en verde del bundle de la aplicación sin pérdida de tipado estricto.
## [2026-05-24] - SPRINT CLOSURE: END-TO-END REACTIVE API INTEGRATION SUCCESSFULLY VERIFIED

- **ESTADO:** TRABAJO COMPLETADO (RESOLVED).
- **MECÁNICA:** Extracción síncrona de parámetros mediante `ActivatedRoute`, saneamiento de nulos para TypeScript e hidratación dinámica del DOM mediante señales nativas.
- **ENTREGABLE:** Arquitectura base de la Unidad 5 certificada con cero errores, cero advertencias de compilación y renderizado visual impecable.

