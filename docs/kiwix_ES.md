# Guía de Inicio Rápido para Kiwix: Servidor Local (Interfaz Gráfica)

Esta guía te mostrará cómo configurar un servidor local con Kiwix, utilizando la interfaz gráfica de la aplicación, para compartir contenido web (como Wikipedia) sin conexión a Internet dentro de una red local.

## 1. Instalación de Kiwix

**Descarga:**

Obtén la versión de Kiwix adecuada para tu sistema operativo que *tenga soporte para servidor local a través de la interfaz gráfica*:

*   **Windows:** Descarga el instalador o la versión portable (no requiere instalación) desde el [sitio web de Kiwix](https://www.kiwix.org/en/download/).  Asegúrate de que la versión que descargues incluya la funcionalidad de servidor.
*   **macOS:** Descarga el instalador desde el [sitio web de Kiwix](https://www.kiwix.org/en/download/). Verifica que sea una versión con soporte para servidor.
*   **Linux:** Busca Kiwix en el gestor de paquetes de tu distribución (por ejemplo, `apt` en Debian/Ubuntu) o descarga un paquete precompilado desde el [sitio web de Kiwix](https://www.kiwix.org/en/download/). Confirma que la versión tiene la opción de servidor en la interfaz.
* **Otras plataformas:** Si usas Android, iOS, o Raspberry Pi es *menos probable* que encuentres una opción de servidor directamente en la *interfaz gráfica* de la aplicación. Considera las instrucciones de la línea de comandos (kiwix-serve) si necesitas funcionalidad de servidor en estas plataformas.

**Instalación:**
Sigue las instrucciones de instalación para tu sistema operativo.  Para las versiones portables (Windows), simplemente descomprime el archivo descargado.

## 2. Obtención de Archivos ZIM

Los archivos ZIM son versiones comprimidas de sitios web que Kiwix utiliza para el acceso sin conexión.

**Descarga:**

1.  Visita el [catálogo de descargas de Kiwix](https://download.kiwix.org/zim/) o utiliza la función de descarga dentro de la aplicación Kiwix (si está disponible).
2.  Encontrarás una amplia variedad de contenido:
    *   Wikipedia (en varios idiomas y tamaños)
    *   Wikcionario
    *   Wikiviajes
    *   Stack Exchange
    *   ¡Y mucho más!
3.  Elige el archivo ZIM que deseas descargar. Presta atención a:
    *   **Idioma:**  Asegúrate de descargar la versión en el idioma correcto.
    *   **Tamaño:**
        *   `nopic`: Sin imágenes (tamaño más pequeño).
        *   `mini`: Versión reducida (tamaño medio).
        *   `maxi`: Versión completa (tamaño más grande).

## 3. Configuración del Servidor Local (Interfaz Gráfica)

*Importante:* No todas las versiones de la aplicación de escritorio de Kiwix ofrecen una opción de servidor integrada en la interfaz gráfica.  Si no encuentras la opción, deberás usar la herramienta de línea de comandos `kiwix-serve` (consulta la documentación de Kiwix para obtener instrucciones).

1.  **Abre Kiwix:** Inicia la aplicación Kiwix.
2.  **Abre el Archivo ZIM (opcional):**  Aunque no es estrictamente necesario abrir el archivo ZIM *antes* de iniciar el servidor, puede ser útil para verificar que el archivo funciona correctamente.  Busca la opción para "Abrir archivo" o "Añadir a la biblioteca" y selecciona el archivo ZIM.
3.  **Encuentra la Opción de Servidor:**
    *   Busca en los menús de la aplicación.  La ubicación exacta varía:
        *   **Menú "Herramientas" -> "Servidor":**  Esta es una ubicación común.
        *   **Menú "Archivo" -> "Compartir" o "Servidor":**  Otra posible ubicación.
        *   **Preferencias/Configuración:**  En algunos casos, la configuración del servidor podría estar en la sección de preferencias o configuración de la aplicación.
        *   **Icono en la barra de herramientas:**  Podría haber un icono específico para iniciar el servidor.
    *   Si no encuentras ninguna opción de servidor, es probable que tu versión de Kiwix no la incluya en la interfaz gráfica.

4.  **Configura el Servidor (si es necesario):**
    *   **Puerto:**  La mayoría de las versiones te permitirán especificar el puerto en el que el servidor escuchará las conexiones.  El puerto por defecto suele ser 8080.  Si ese puerto está ocupado, puedes cambiarlo.
    *   **Dirección IP:** Algunas versiones pueden permitirte especificar la interfaz de red a la que se vinculará el servidor (por ejemplo, para restringirlo a una red local específica).
    *   **Otras opciones:**  Dependiendo de la versión, podrías encontrar opciones adicionales, como la posibilidad de establecer una contraseña o limitar el número de conexiones.

5.  **Inicia el Servidor:**  Haz clic en el botón o la opción para "Iniciar", "Activar" o "Arrancar" el servidor.

6.  **Verifica el Estado:** La aplicación debería indicar que el servidor está en funcionamiento.  Algunas versiones muestran la dirección IP y el puerto en la interfaz.

**Acceso al Servidor desde Otros Dispositivos:**

Una vez que el servidor esté funcionando, otros dispositivos en la *misma red local* pueden acceder al contenido:

1.  Abre un navegador web en el dispositivo cliente.
2.  En la barra de direcciones, escribe:
    *   `http://localhost:[puerto]` (si accedes desde la *misma* máquina donde se ejecuta el servidor Kiwix, reemplazando `[puerto]` si cambiaste el puerto por defecto).
    *   `http://[dirección IP de la máquina]:[puerto]` (reemplaza `[dirección IP de la máquina]` con la dirección IP *local* de la computadora que ejecuta el servidor Kiwix, y `[puerto]` por el puerto que configuraste, si es diferente del predeterminado).  *No uses la dirección IP pública*.

**Importante:**

*   **Firewall:** Asegúrate de que el firewall de tu sistema operativo no esté bloqueando las conexiones entrantes al puerto que configuraste para el servidor Kiwix.  Es posible que necesites añadir una excepción al firewall.
*   **Red Local:**  El servidor Kiwix solo es accesible desde dispositivos en la misma red local.  No es accesible desde Internet a menos que configures un reenvío de puertos en tu router (lo cual no se recomienda por razones de seguridad a menos que sepas lo que estás haciendo).
* **Versiones de Kiwix:** Si no tienes la opción en la Interfaz Gráfica, es porque la versión de Kiwix no lo soporta.

Con estos pasos, habrás configurado un servidor local con Kiwix utilizando la interfaz gráfica, permitiendo que otros dispositivos en tu red accedan al contenido ZIM sin conexión.