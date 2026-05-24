# 📋 ESPECIFICACIONES TÉCNICAS (spec.md) - MOVIE APP

Este documento define los requisitos técnicos, restricciones de arquitectura y criterios de aceptación obligatorios implementados para la entrega de la Unidad 5.

---

## 1. CONTROL DE RENDIMIENTO Y REACTIVIDAD (Zoneless)
- [x] **Remoción de Zone.js:** La aplicación prescinde por completo de la vigilancia ciega de `zone.js` mediante la inyección de `provideZonelessChangeDetection()` en el archivo `app.config.ts`.
- [x] **Estrategia OnPush:** Los componentes principales implementan `changeDetection: ChangeDetectionStrategy.OnPush` para evitar re-renderizados innecesarios en el DOM.
- [x] **Uso de Signals nativos:** Se elimina el uso de variables mutables tradicionales en favor de Señales de Angular, garantizando que la vista reaccione en tiempo real solo cuando los datos cambian.

## 2. CAPA DE SERVICIOS E INFRAESTRUCTURA HTTP
- [x] **Desacoplamiento de datos:** Las peticiones de red están totalmente aisladas dentro del servicio inyectable `MoviesService` utilizando el cliente reactivo `HttpClient`.
- [x] **Persistencia Simulada:** El backend se simula de forma local mediante `json-server`, leyendo y escribiendo en el archivo de datos centralizado `api-mock/db.json` a través del puerto `3000`.
- [x] **Tipado Estricto:** Todos los flujos de datos que viajan desde el servidor se validan bajo la estructura estricta de la interfaz `Movie`.

## 3. PIPELINE REACTIVO DE ENRUTAMIENTO
La consulta de películas por ID en la vista de detalles se procesa mediante una tubería reactiva funcional (`pipe()`) encadenando los siguientes operadores de RxJS:
- [x] **`map`:** Para extraer de forma segura el parámetro de la URL sin generar conflictos de tipos nulos en TypeScript.
- [x] **`filter`:** Como cortafuegos para bloquear textos vacíos o indefinidos antes de estresar al servidor.
- [x] **`switchMap`:** Para cancelar peticiones HTTP obsoletas de forma automática si el usuario navega rápidamente entre enlaces.
- [x] **`catchError`:** Como paracaídas técnico para interceptar respuestas de error (como un 404 de ID inexistente) y emitir un valor `null` controlado que mantenga la app viva.

## 4. GESTIÓN DE 3 ESTADOS EN LA INTERFAZ (UX)
La plantilla del componente `movie-details.ts` controla el flujo visual de forma nativa mediante bloques `@if` y `@else` para alternar dinámicamente entre tres escenarios:
- [x] **Estado 1 (Carga):** Indicador visual activo mientras la petición HTTP está viajando por la red.
- [x] **Estado 2 (Éxito):** Renderizado de la ficha técnica utilizando navegación segura (`movie()?.title`) una vez llegan los datos.
- [x] **Estado 3 (Error 404):** Mensaje de advertencia controlado con un botón de retorno si el canal reactivo emite un `null`.

## 5. REQUISITOS DE DISEÑO VISUAL (Tailwind CSS)
- [x] **Interfaz Limpia y Clara:** Configuración de fondos claros e higiénicos (`bg-white` / `bg-slate-50`) en las tarjetas del catálogo para garantizar una lectura cómoda y descansada.
- [x] **Contraste de Textos:** Títulos principales fuertemente contrastados (`text-slate-900`) y textos secundarios legibles (`text-slate-500`).
- [x] **Navegación Intuitiva:** Botones de acción con transiciones y estados hover definidos para guiar al usuario.