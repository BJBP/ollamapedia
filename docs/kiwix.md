# Quick Start Guide for Kiwix: Local Server (Graphical Interface)

This guide will show you how to set up a local server with Kiwix, using the application's graphical interface, to share web content (like Wikipedia) offline within a local network.

## 1. Kiwix Installation

**Download:**

Get the appropriate version of Kiwix for your operating system that *supports local server via the graphical interface*:

*   **Windows:** Download the installer or portable version (no installation required) from the [Kiwix website](https://www.kiwix.org/en/download/). Make sure the version you download includes server functionality.
*   **macOS:** Download the installer from the [Kiwix website](https://www.kiwix.org/en/download/). Verify that it is a version with server support.
*   **Linux:** Look for Kiwix in your distribution's package manager (e.g., `apt` in Debian/Ubuntu) or download a pre-compiled package from the [Kiwix website](https://www.kiwix.org/en/download/). Confirm that the version has the server option in the interface.
*   **Other platforms:** If you use Android, iOS, or Raspberry Pi, it is *less likely* that you will find a server option directly in the *graphical interface* of the application. Consider the command line instructions (kiwix-serve) if you need server functionality on these platforms.

**Installation:**
Follow the installation instructions for your operating system. For portable versions (Windows), simply unzip the downloaded file.

## 2. Obtaining ZIM Files

ZIM files are compressed versions of websites that Kiwix uses for offline access.

**Download:**

1.  Visit the [Kiwix download catalog](https://download.kiwix.org/zim/) or use the download function within the Kiwix application (if available).
2.  You will find a wide variety of content:
    *   Wikipedia (in various languages and sizes)
    *   Wiktionary
    *   Wikivoyage
    *   Stack Exchange
    *   And much more!
3.  Choose the ZIM file you want to download. Pay attention to:
    *   **Language:** Make sure you download the version in the correct language.
    *   **Size:**
        *   `nopic`: Without images (smaller size).
        *   `mini`: Reduced version (medium size).
        *   `maxi`: Full version (larger size).

## 3. Setting up the Local Server (Graphical Interface)

*Important:* Not all versions of the Kiwix desktop application offer a server option integrated into the graphical interface. If you do not find the option, you should use the `kiwix-serve` command line tool (see the Kiwix documentation for instructions).

1.  **Open Kiwix:** Launch the Kiwix application.
2.  **Open the ZIM File (optional):** Although it is not strictly necessary to open the ZIM file *before* starting the server, it can be helpful to verify that the file works correctly. Look for the option to "Open file" or "Add to library" and select the ZIM file.
3.  **Find the Server Option:**
    *   Look in the application menus. The exact location varies:
        *   **"Tools" -> "Server" menu:** This is a common location.
        *   **"File" -> "Share" or "Server" menu:** Another possible location.
        *   **Preferences/Settings:** In some cases, the server configuration might be in the preferences or settings section of the application.
        *   **Icon in the toolbar:** There might be a specific icon to start the server.
    *   If you do not find any server option, it is likely that your version of Kiwix does not include it in the graphical interface.

4.  **Configure the Server (if necessary):**
    *   **Port:** Most versions will allow you to specify the port on which the server will listen for connections. The default port is usually 8080. If that port is busy, you can change it.
    *   **IP Address:** Some versions may allow you to specify the network interface to which the server will bind (for example, to restrict it to a specific local network).
    *   **Other options:** Depending on the version, you might find additional options, such as the ability to set a password or limit the number of connections.

5.  **Start the Server:** Click the button or option to "Start", "Activate" or "Run" the server.

6.  **Check the Status:** The application should indicate that the server is running. Some versions show the IP address and port in the interface.

**Accessing the Server from Other Devices:**

Once the server is running, other devices on the *same local network* can access the content:

1.  Open a web browser on the client device.
2.  In the address bar, type:
    *   `http://localhost:[port]` (if accessing from the *same* machine where the Kiwix server is running, replacing `[port]` if you changed the default port).
    *   `http://[machine IP address]:[port]` (replace `[machine IP address]` with the *local* IP address of the computer running the Kiwix server, and `[port]` with the port you configured, if different from the default). *Do not use the public IP address*.

**Important:**

*   **Firewall:** Make sure your operating system's firewall is not blocking incoming connections to the port you configured for the Kiwix server. You may need to add an exception to the firewall.
*   **Local Network:** The Kiwix server is only accessible from devices on the same local network. It is not accessible from the Internet unless you configure port forwarding on your router (which is not recommended for security reasons unless you know what you are doing).
*   **Kiwix Versions:** If you don't have the option in the Graphical Interface, it's because the Kiwix version doesn't support it.

With these steps, you will have set up a local server with Kiwix using the graphical interface, allowing other devices on your network to access ZIM content offline.