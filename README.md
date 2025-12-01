## Trivia con modo batalla

App web responsive que soporta juego singleplayer o multiplayer (local) y persistencia en sesión de los scores (leaderboard).

### Para correr la app:

Crear un archivo .env en el root del proyecto e incluir la variable: `VITE_API_BASE_URL=https://<domain>.supabase.co/functions/v1`

Luego instalar dependencias y correrla:

```
yarn install
yarn run dev
```

La app queda disponible en `http://localhost:5173/`

### Decisiones

**Setup**: La app está creada con Vite + TypeScript. Incluí Sass para estilos.
Otras dependencias: lucide-react (íconos), motion (animaciones) y classnames (estilos condicionales)

**Navegación**: Por el scope del challenge, manejo la navegación con un estado interno en el GameProvider. Podría haber usado React Router si se necesitaban rutas navegables (/leaderboard, /play/classic, etc.).

**Configuración de preguntas**:

- Se elige aleatoriamente un conjunto de preguntas al iniciar un juego.
- 8 turnos de juego por defecto, un turno representa una pregunta por jugador.
- No incluí manejo de errores de fetch (retry, UI especial) por simplicidad del challenge.

**Inicio**: Las preguntas se obtienen durante el loader inicial para simplificar el flujo.
Se agregó un pequeño delay para evitar un flash demasiado rápido del loader.

**Modo clásico (Single Player)**:

- Asumí que se deseaba contar con customización del nombre del player, es opcional. Si no lo ingresa posteriormente en el leaderboard va a figurar como `Player 1`.
- El botón de restart mantiene el nombre ingresado y obtiene nuevas preguntas aleatorias.

**Modo Batalla (1 vs 1)**:

- Asumí que se soportan empates así como los casos de ganador / perdedor.
- IDEM a modo clásico, soporta customizacion opcional de nombres de los players, por defecto son (`Player 1`, `Player 2`).
- El restart mantiene los nombres y genera nuevas preguntas.

**Extras**:

- **Animaciones**: en transiciones entre preguntas y feedback visual al seleccionar una respuesta.

- **Temporizador**: cada pregunta tiene 8 segundos. Al llegar a cero se bloquea la interacción y se marca como un error en la respuesta.

- **Guardado del puntaje más alto**: se guardan dos keys (`classic_leader_board` y `battle_leader_board`) en localStorage para diferenciar clásico vs batalla.

**Otras consideraciones**:

- No incluí pausa ni navegación hacia atrás durante la partida. Solo es posible reiniciar o volver al menú al finalizar.
- A su vez, podrían ser configurable al inicio del juego la elección de cantidad de preguntas y tiempo límite por pregunta pero para mantenerlo simple definí valores por defecto.

## Showcase de la app

### Modo Clásico

[Descargar video](./showcase/showcase-app-classic-mode.mp4)

### Modo Batalla

[Descargar video](./showcase/showcase-battle-mode.mp4)

### Versión Mobile

[Descargar video](./showcase/showcase-mobile.mp4)
