# Documentation

This is the documentation for Ollamapedia.

## Overview

This web page allows the user to ask a question, extract key terms from that question, search for relevant information in a Kiwix library, and then use that information as context to get a more accurate response from a language model through the Ollama API.

## Files

### `index.html`

The `index.html` file defines the structure of the web page. It includes the following key elements:

*   **Title:** Sets the title of the page to "Ollama Streaming".
*   **Output Area:** A `div` element with the ID `output` where the streaming response from Ollama is displayed.
*   **Prompt Input:** An `input` element with the ID `prompt` where the user enters their query.
*   **Send Button:** A `button` element with the ID `send` that triggers the request to Ollama when clicked.
*   **JavaScript Inclusion:** A `script` tag that links the `script.js` file, which contains the logic for interacting with the Ollama API.

### `style.css`

The `style.css` file provides the styling for the web page. It includes basic styles for:

*   **Body:** Sets the font family, display properties, alignment, and padding.
*   **Output Area:** Styles the `output` div with a margin, padding, border, width, and minimum height.
*   **Input Field:** Styles the `input` field with a width, padding, and margin.
*   **Button:** Styles the `button` with padding, background color, text color, border, and cursor.

### `script.js`

The `script.js` file contains the JavaScript code that handles the interaction with the Ollama API. Here's a breakdown of the code:

*   **DOMContentLoaded Listener:** Ensures that the script runs after the HTML document has been fully loaded.
*   **Element References:** Retrieves references to the `output`, `prompt`, and `send` elements using their respective IDs.
*   **Send Button Listener:** Attaches an event listener to the `send` button that triggers the following actions when clicked:
    *   **Prompt Retrieval:** Gets the value entered in the `prompt` input field.
    *   **Output Clearing:** Clears the previous content of the `output` div.
    *   **Fetch Request:** Sends a `POST` request to the Ollama API endpoint (`http://localhost:11434/api/generate`) with the following:
        *   `method`: `POST`
        *   `headers`: Sets the `Content-Type` to `application/json`.
        *   `body`: A JSON string containing the following:
            *   `model`: The name of the Ollama model to use (`phi4-mini:latest`).
            *   `prompt`: The user's input prompt.
            *   `stream`: Set to `true` to enable streaming responses.
    *   **Response Handling:**
        *   Checks if the response is successful (status code 200-299). If not, throws an error.
        *   Gets a `reader` from the response body to read the streaming data.
        *   Creates a `TextDecoder` to decode the data.
        *   Enters a `while` loop that continues until the stream is finished:
            *   Reads a chunk of data from the stream using `reader.read()`.
            *   If the stream is done, breaks out of the loop.
            *   Decodes the chunk of data using `decoder.decode(value)`.
            *   Splits the chunk into lines based on newline characters (`\n`).
            *   Iterates over each line:
                *   Skips empty lines.
                *   Parses the line as JSON.
                *   Appends the `response` property from the JSON to the `output` div.
                *   Handles potential JSON parsing errors.
    *   **Error Handling:** Catches any errors that occur during the process and displays an error message in the `output` div.

## Ollama API

The `script.js` file interacts with the Ollama API using the `/api/generate` endpoint. This endpoint expects a `POST` request with a JSON body containing the `model`, `prompt`, and `stream` parameters. It returns a streaming response with JSON objects, each containing a `response` property with a chunk of the generated text.