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