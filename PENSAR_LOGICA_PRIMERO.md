# 🧠 PENSAR LÓGICA PRIMERO: ARQUITECTURA MOVIE-APP

Este documento detalla el mapa mental, las decisiones técnicas y la estrategia reactiva utilizada para resolver el flujo de datos de la aplicación de películas en Angular, priorizando el rendimiento, la reactividad pura y el manejo de errores.

---

## 🧭 PARTE 1: Flujo de Datos Desacoplado (El Servicio)

Antes de pintar cualquier elemento en la interfaz, la lógica exige que los datos viajen de forma segura desde el servidor (`json-server`) hasta la aplicación.
* **Decisión:** Crear `MoviesService`.
* **Lógica de Aprendizaje:** Usar el cliente HTTP de Angular para disparar peticiones asíncronas (`HttpClient`). El componente jamás debe saber de dónde vienen las películas (URL, base de datos o local); solo se las pide al servicio, manteniendo responsabilidades separadas.

---

## 🔄 PARTE 2: Transformación de Flujos a Señales (`toSignal`)

Trabajar con Observables puros en la vista obliga a usar tuberías asíncronas (`| async`) que complican el HTML y pueden provocar fugas de memoria si no se gestionan de forma manual.
* **Estrategia:** Interceptar el Observable del servicio en el componente usando el operador maestro `toSignal()`.
* **Lógica de Aprendizaje:** 1. Transforma el flujo infinito de internet en una **Señal síncrona** (`movies()`).
  2. Evita valores iniciales rotos (`undefined`) gracias al parámetro `{ initialValue: [] }`.
  3. Se limpia y se desuscribe automáticamente de la memoria cuando el usuario cambia de pantalla.

---

## ⚡ PARTE 3: Optimización Extrema (Zoneless + OnPush)

Para evitar que la aplicación consuma recursos revisando el navegador de forma automática cada vez que movemos el ratón o hacemos un clic, configuramos una arquitectura de alto rendimiento.
* **Zoneless:** Eliminamos `zone.js` en `app.config.ts`. Angular ya no vigila todo el navegador a ciegas.
* **OnPush:** En el componente activamos `changeDetection: ChangeDetectionStrategy.OnPush`.
* **Lógica de Aprendizaje:** Al combinar ambos, le prohibimos a Angular trabajar en balde. El componente **solo** se redibujará si su propia Señal interna (`movies`) recibe datos nuevos del servidor.

---

## 🔁 PARTE 4: La Tubería Reactiva Avanzada (Lógica de `movie-details.ts`)

Para gestionar la carga de una película según el ID de la URL sin recargar la página, programamos una tubería reactiva en cadena utilizando operadores de RxJS dentro del método `pipe()`. Esta es la explicación exacta de cada paso:

* **1. Lectura segura con `map`:** Escuchamos los parámetros de la URL con `this.route.paramMap`. Usamos `map(params => params.get('id') || '')` para extraer el identificador. Si por algún motivo el ID no existe, el cortocorticuito `|| ''` obliga a devolver un texto vacío. Esto evita fallos de tipos en TypeScript y soluciona el error `TS2345`.
* **2. Cortafuegos con `filter`:** Añadimos `filter(movieId => movieId !== '' && movieId !== 'undefined')`. Si el enrutador de Angular tarda unos milisegundos en arrancar y emite un valor indefinido o vacío, este operador detiene la ejecución en el acto. Así evitamos enviar peticiones basura o rotas al servidor local.
* **3. Conmutación inteligente con `switchMap`:** Recibe el ID limpio y salta al servicio de datos con `this.moviesService.getMovieById(movieId).` Si el usuario es muy rápido y hace clic en varias películas seguidas, `switchMap` tiene la inteligencia de cancelar automáticamente las peticiones HTTP anteriores que se hayan quedado colgadas en la red y solo se suscribe a la última, optimizando el rendimiento.
* **4. El paracaídas con `catchError`:** Si el usuario escribe en la URL el ID de una película que no existe en nuestro archivo `db.json`, el servidor HTTP devolverá un fallo (Error 404). Colocamos un `catchError(() => of(null))` al final de la petición para capturar ese fallo, evitar que la aplicación se congele y emitir un valor `null` limpio.
* **5. Conversión final con `toSignal`:** Envolvemos toda esta cadena dentro de `toSignal(...)`. Esto transforma el flujo de datos asíncrono en una Señal síncrona y de lectura directa, encargándose además de limpiar la memoria de forma automática al salir de la pantalla.

---

## 🎭 PARTE 5: Control de Flujo de 3 Estados en la Vista (HTML de `movie-details.ts`)

Gracias al valor que emite nuestra señal reactiva del paso anterior, la plantilla HTML toma de forma autónoma decisiones lógicas en tiempo real utilizando el nuevo sistema de control de flujo nativo de Angular:

* **Estado 1: Éxito (`@if (movie())`)**
  Si la señal contiene los datos correctos de la película devuelta por la API, se activa este primer bloque. Pintamos la tarjeta con el título, género, director y año. Usamos la navegación segura con interrogación (`movie()?.title`) para blindar el HTML y asegurar que no intente leer propiedades antes de que la señal se cargue del todo.
* **Estado 2: Error 404 (`@else if (movie() === null)`)**
  Si el paracaídas de `catchError` interceptó un fallo en el servidor e inyectó un valor `null`, el HTML salta automáticamente a este bloque. En lugar de mostrar una pantalla rota o vacía, mostramos una alerta controlada con un fondo suave que avisa al usuario que la película no existe y le ofrece un botón para regresar a salvo al catálogo.
* **Estado 3: Carga Inicial (`@else`)**
  Mientras la URL se está resolviendo y la petición HTTP está viajando por internet (esos primeros milisegundos iniciales), la señal no es ni datos ni nulo. El HTML muestra este tercer estado con un mensaje animado (`animate-pulse`) que indica que se está sincronizando con el servidor, mejorando drásticamente la experiencia de usuario.