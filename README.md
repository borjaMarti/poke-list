<p align="center">
  <br>
    <img src="./public/logo.png" height="70"/>
  <br>
</p>

# PokéList

### Enlace a demo

[https://poke-list-beta.vercel.app/](https://poke-list-beta.vercel.app/)

## Funcionalidad

- PokéList muestra un listado de los 151 Pokémon originales con su sprite y nombre.
- Por toda la aplicación, podemos capturar o liberar Pokémon utilizando las Pokéballs.
- Los Pokémon capturados se mostrarán en la página de CAPTURADOS.
- También podemos acceder a la entrada de la Pokédex de cada Pokémon haciendo click en el mismo.

## Objetivos personales para el proyecto

1. **Buenas prácticas**:

- Tipado completo.
- Integración con ESLint y Prettier.
- Estructura de archivos que facilite la organización.
- Comentarios en código que expliquen la lógica de las decisiones tomadas.
- Patrones de programación adaptados al stack elegido.
- Diseño responsive, accesible, y (en lo posible) estético.

2. **Eficiencia**:

- Identificar los aspectos más relevantes e importantes del proyecto.
- Implementar la funcionalidad requerida cumpliendo con el objetivo #1 en un tiempo razonable.
- Duración del proyecto: un fin de semana.

## Consideraciones

1. **Router**:

- Tecnología elegida: [TanStack Router](https://tanstack.com/router/latest).
- Razonamiento: Era una herramienta nueva para mí, pero habiendo leído comentarios positivos sobre ella y, aprovechando que recientemente ha sido lanzada la v1, he querido probarla para ver qué tal estaba. Me ha gustado mucho. Viniendo de haber utilizado NextJS, me ha parecido fácil de empezar a utilizar. Me gusta mucho el sistema de enrutado mediante el sistema de archivos, separando la lógica de las rutas/páginas en su propio directorio.

2. **Consumo de API**:

- Tecnologías elegidas: [GraphQL](https://graphql.org/), [graphql-request](https://github.com/jasonkuhrt/graphql-request), [graphql-codegen](https://the-guild.dev/graphql/codegen).
- Razonamiento: Al analizar inicialmente el funcionamiento de los distintos endpoints de PokéAPI, me dí cuenta de que me encontraba ante un problema si decidía hacer el consumo mediante llamadas por HTTP. La idea que tenía para la aplicación, era mostrar en la vista inicial tan solo nombres y sprites, y pedir el resto de datos de cada Pokémon en su ruta dinámica correspondiente al accederla. La manera en la que los endpoints HTTP de PokéAPI están estructurados hace que para poder conseguir esa información inicial (nombre capitalizado en español y sprite), haya que hacer primero una llamada para obtener el listado de Pokémon (pidiendo mediante un query parameter 151 entradas por ejemplo). Esto nos devuelve tan solo el enlace al endpoint de cada uno, de manera que habría que acceder a esos 151 para recuperar el sprite, y después, seguir con otra llamada a otro endpoint para el nombre. Una posible manera de implementarlo hubiera sido con un sistema de paginación, pero me parecía insuficiente. Al ver que PokéAPI cuenta con una interfaz de GraphQL, ví que podía ser una buena solución. Dispone de una [consola de GraphiQL](https://beta.pokeapi.co/graphql/console) para construir la query, de manera que con solo una llamada, podía recuperar los datos del listado de los 151 Pokémon. A la hora de implementar GraphQL con TypeScript, he utilizado el cliente graphql-request, y la herramienta de CLI graphql-codegen, que, una vez configurado apuntándolo a la dirección del Schema, [hace automáticamente el tipado de las queries](https://the-guild.dev/graphql/codegen/docs/guides/react-vue) que se encuentra en la base del código. Me ha parecido una herramienta increíble y ha hecho el proceso súper sencillo.

3. **Gestión de estado asíncrono**

- Tecnología elegida: [TanStack Query](https://tanstack.com/query/latest).
- Razonamiento: A pesar de que la aplicación solo consume información, y no la modifica, por lo que no es necesaria una gestión de estado, TanStack Query implementa una serie de funcionalidades muy útiles, cómo los estados `isLoading`, `isSuccess`, e `isError` para implementar en la lógica de renderizado. Además, viene con una solución de cache excelente. Como ya hemos mencionado que no vamos a modificar la información consumida, por defecto la aplicación tiene un tiempo de caducidad del cache de `Infinity`. Otra alternativa a TanStack Query suficiente para este proyecto podría haber sido utilizar el sistema `loader` que nos ofrece TanStack Router para recuperar información mediante la propia ruta.

4. **Gestión de estado síncrono global**:

- Tecnología elegida: [Zustand](https://github.com/pmndrs/zustand).
- Razonamiento: Esta es otra tecnología con la que no tenía tanta familiaridad, pero después de echar una ojeada a la documentación he querido ponerla en práctica. La documentación es genial. El motivo para usar un gestor de estado global es que queremos poder acceder al almacenamiento de Pokémon capturados desde distintos componentes y rutas, y persistirlos entre sesiones del navegador en `localStorage`. La implementación que he elegido es utilizar un `Set` con todos los ids de los Pokémon que vamos capturando, de manera que cuándo necesitamos comprobar, por ejemplo, en la vista inicial según se renderizan todos los Pokémon cuáles han sido capturados para modificar el estado de la Pokéball, el tiempo de búsqueda de cada id sea constante contra el `Set` (en vez de lineal con un `Array`). Para poder persistir este `Set` en `localStorage`, primero tenemos que serializarlo. Afortunadamente, Zustand nos permite implementar nuestro propio motor de almacenamiento:

```ts
storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              captured: new Set(state.captured),
            },
          };
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: {
              captured: Array.from(newValue.state.captured.values()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      }
```

5. **UI**:

- Tecnología elegida: [MUI](https://mui.com/).
- Razonamiento: Debido a que el diseño de la aplicación era una de las prioridades más bajas, he decidido utilizar una librería de componentes ya pre-estilados para poder conseguir una presentación limpia sin invertir demasiado tiempo.

6. **Testing**:

- Tecnología elegida: [Vitest](https://www.google.com/search?client=firefox-b-d&q=vitest).
- Razonamiento: Vitest tiene muy buena integración con Vite (habiendo sido desarrollado específicamente para el entorno), por lo que es una elección segura. He implementado algunos tests para las funciones de utilidad, pero debido a la limitación de tiempo del proyecto, hay aspectos que no han sido cubiertos. De haber tenido más tiempo, hubiera implementado tests para la store de Zustand siguiendo [la documentación oficial](https://docs.pmnd.rs/zustand/guides/testing) que incluye instrucciones para Vitest. Para el testeo de los hooks relacionados con llamadas a la API, hubiera utilizado [Mock Service Worker](https://mswjs.io/), y finalmente [Cypress](https://www.cypress.io/) para end to end testing basado en el navegador.

## Instalación

Clonar repositorio a entorno local, instalar con `npm install`, e inicializar con `npm run dev`.
