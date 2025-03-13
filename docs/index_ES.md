# Documentación

Esta es la documentación para la Página Web de Streaming con Ollama.

## Descripción general

Esta página web proporciona una interfaz simple para interactuar con el modelo de lenguaje Ollama utilizando respuestas de streaming. Permite a los usuarios ingresar un prompt y recibir una respuesta en tiempo real y fragmentada del modelo.

## Archivos

### `index.html`

El archivo `index.html` define la estructura de la página web. Incluye los siguientes elementos clave:

*   **Título:** Establece el título de la página como "Ollama Streaming".
*   **Área de salida:** Un elemento `div` con el ID `output` donde se muestra la respuesta de streaming de Ollama.
*   **Entrada de prompt:** Un elemento `input` con el ID `prompt` donde el usuario ingresa su consulta.
*   **Botón de envío:** Un elemento `button` con el ID `send` que activa la solicitud a Ollama cuando se hace clic.
*   **Inclusión de JavaScript:** Una etiqueta `script` que vincula el archivo `script.js`, que contiene la lógica para interactuar con la API de Ollama.

### `style.css`

El archivo `style.css` proporciona el estilo para la página web. Incluye estilos básicos para:

*   **Cuerpo:** Establece la familia de fuentes, las propiedades de visualización, la alineación y el relleno.
*   **Área de salida:** Estilos el `div` de `output` con un margen, relleno, borde, ancho y altura mínima.
*   **Campo de entrada:** Estilos el campo `input` con un ancho, relleno y margen.
*   **Botón:** Estilos el `button` con relleno, color de fondo, color de texto, borde y cursor.

### `script.js`

El archivo `script.js` contiene el código JavaScript que maneja la interacción con la API de Ollama. Aquí hay un desglose del código:

*   **Listener DOMContentLoaded:** Asegura que el script se ejecute después de que el documento HTML se haya cargado completamente.
*   **Referencias de elementos:** Recupera referencias a los elementos `output`, `prompt` y `send` utilizando sus respectivos ID.
*   **Listener del botón de envío:** Adjunta un listener de eventos al botón `send` que activa las siguientes acciones cuando se hace clic:
    *   **Recuperación de prompt:** Obtiene el valor ingresado en el campo de entrada `prompt`.
    *   **Borrado de salida:** Borra el contenido anterior del `div` de `output`.
    *   **Solicitud de Fetch:** Envía una solicitud `POST` al punto final de la API de Ollama (`http://localhost:11434/api/generate`) con lo siguiente:
        *   `method`: `POST`
        *   `headers`: Establece el `Content-Type` en `application/json`.
        *   `body`: Una cadena JSON que contiene lo siguiente:
            *   `model`: El nombre del modelo Ollama para usar (`phi4-mini:latest`).
            *   `prompt`: El prompt de entrada del usuario.
            *   `stream`: Establecido en `true` para habilitar las respuestas de streaming.
    *   **Manejo de respuesta:**
        *   Comprueba si la respuesta es exitosa (código de estado 200-299). Si no, lanza un error.
        *   Obtiene un `reader` del cuerpo de la respuesta para leer los datos de streaming.
        *   Crea un `TextDecoder` para decodificar los datos.
        *   Entra en un bucle `while` que continúa hasta que finaliza el stream:
            *   Lee un fragmento de datos del stream usando `reader.read()`.
            *   Si el stream está terminado, sale del bucle.
            *   Decodifica el fragmento de datos usando `decoder.decode(value)`.
            *   Divide el fragmento en líneas según los caracteres de nueva línea (`\n`).
            *   Itera sobre cada línea:
                *   Omite las líneas vacías.
                *   Analiza la línea como JSON.
                *   Agrega la propiedad `response` del JSON al `div` de `output`.
                *   Maneja posibles errores de análisis JSON.
    *   **Manejo de errores:** Captura cualquier error que ocurra durante el proceso y muestra un mensaje de error en el `div` de `output`.

## API de Ollama

El archivo `script.js` interactúa con la API de Ollama utilizando el punto final `/api/generate`. Este punto final espera una solicitud `POST` con un cuerpo JSON que contiene los parámetros `model`, `prompt` y `stream`. Devuelve una respuesta de streaming con objetos JSON, cada uno de los cuales contiene una propiedad `response` con un fragmento del texto generado.