# MovieApp 🎬

Single Page Application (SPA) modular de alto rendimiento para la gestión y catalogación de películas, construida sobre el ecosistema nativo de **Angular 21**.

Este proyecto ha sido diseñado bajo los estándares más estrictos de arquitectura limpia y optimización de recursos en entornos UNIX (Ubuntu 24.04 LTS).

---

## 🚀 Stack Tecnológico e Infraestructura

| Tecnología | Componente / Rol | Estado en el Proyecto |
| :--- | :--- | :--- |
| **Angular 21** | Framework de Aplicación | Componentes Standalone Nativos |
| **pnpm v11** | Gestor de Dependencias | Almacén Direccionable (Enlaces Duros) |
| **TailwindCSS** | Framework de Estilos | Diseño Responsivo y Atómico |
| **Node v22 (LTS)** | Entorno de Ejecución | Administrado mediante NVM |

---

## 🏗️ Pilares de Arquitectura y Rendimiento

1. **Ecosistema Zoneless Puro:** Se ha erradicado por completo el uso de `Zone.js` mediante la inyección de `provideZonelessChangeDetection()`, reduciendo la sobrecarga de interceptación de eventos en el hilo principal del navegador.

2. **Estrategia Inmutable OnPush:** Todos los componentes de presentación y vistas operan bajo `ChangeDetectionStrategy.OnPush`, delegando el repintado exclusivamente a mutaciones de estado explícitas.

3. **Enrutamiento Asíncrono (Lazy Loading):** La tabla de navegación global está diseñada mediante promesas dinámicas e importaciones desestructuradas, forzando la fragmentación del código fuente en *chunks* independientes cargados bajo demanda del cliente.

4. **Gobiernos Spec-First:** Despliegue de desarrollo conducido por especificaciones (`spec.md`) y bitácoras técnico-comerciales inmutables (`PRODUCT_LOG.md`).

---

## 🛠️ Instalación y Despliegue Local

Siga estas instrucciones en su terminal UNIX para inicializar el entorno de desarrollo:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AnaBHernandez/movie-app.git
cd movie-app
```

### 2. Instalar Dependencias de Forma Segura

Este proyecto bloquea el uso de npm tradicional para mitigar vulnerabilidades. Es obligatorio utilizar `pnpm`:

```bash
pnpm install
```

### 3. Levantar Servidor de Desarrollo

Arranca la aplicación localmente en el puerto por defecto:

```bash
pnpm start
```

Abra http://localhost:4200 en su navegador para visualizar la SPA.

---

**Autora:** [AnaBHernandez](https://github.com/AnaBHernandez) | **Última actualización:** Mayo 2026