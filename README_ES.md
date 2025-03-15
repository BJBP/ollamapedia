# Ollamapedia

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-green.svg)](README_ES.md)

[English](README.md) | [Español](README_ES.md)

Una página web que permite al usuario hacer una pregunta, extraer términos clave de esa pregunta, buscar información relevante en una biblioteca de Kiwix y luego usar esa información como contexto para obtener una respuesta más precisa de un modelo de lenguaje a través de la API de Ollama.

Este proyecto proporciona una interfaz web para interactuar con modelos de lenguaje Ollama. Permite a los usuarios seleccionar un modelo de una lista desplegable, ingresar un prompt y recibir una respuesta en tiempo real y fragmentada.

## Tabla de Contenido

*   [Acerca de](#acerca-de)
*   [Instalación](#instalación)
*   [Uso](#uso)
*   [Contribución](#contribución)
*   [Licencia](#licencia)

## Acerca de

Este proyecto demuestra cómo crear una página web que se conecta al modelo de lenguaje Ollama y muestra respuestas de streaming. Utiliza HTML, CSS y JavaScript para crear una interfaz de usuario simple e interactiva.

## Instalación

1.  Asegúrate de tener Ollama instalado y en ejecución.
2.  Asegúrate de tener al menos un modelo de lenguaje descargado en Ollama (por ejemplo, llama3).
3.  Asegúrate de tener Kiwix instalado y en ejecución el servidor local Kiwix.
4.  Asegúrate de tener al menos un archivo ZIM descargado (por ejemplo, wikipedia_es_all_maxi.zim).
2.  Clona el repositorio:

```bash
git clone https://github.com/your-username/your-project.git
```

3.  Navega al directorio del proyecto:

```bash
cd your-project
```

4.  Abre el archivo `index.html` en tu navegador.

## Uso

1.  Selecciona un modelo de la lista desplegable.
2.  Escribe tu prompt en el campo de entrada.
3.  Haz clic en el botón "Enviar".
4.  La respuesta de Ollama se mostrará en el div de salida.


## Contribución

¡Las contribuciones son bienvenidas! Por favor, envía una solicitud de extracción con tus cambios.

## Licencia

MIT