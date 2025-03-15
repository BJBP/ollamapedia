# Ollamapedia

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-green.svg)](README_ES.md)

[English](README.md) | [Español](README_ES.md)

A web page that allows the user to ask a question, extract key terms from that question, search for relevant information in a Kiwix library, and then use that information as context to get a more accurate response from a language model through the Ollama API.

This project provides a web interface for interacting with Ollama language models. It allows users to select a model from a dropdown, enter a prompt, and receive a real-time, chunked response.

## Table of Contents

*   [About](#about)
*   [Installation](#installation)
*   [Usage](#usage)
*   [Contributing](#contributing)
*   [License](#license)

## About

This project demonstrates how to create a web page that connects to the Ollama language model and displays streaming responses. It uses HTML, CSS, and JavaScript to create a simple and interactive user interface.

## Installation

1.  Make sure you have Ollama (https://ollama.com/) installed and running.
2.  Make sure you have at least one language model downloaded in Ollama (e.g., llama3).
3.  Make sure you have Kiwix (https://www.kiwix.org/en/) installed and running the Kiwix local server.
4.  Make sure you have at least one ZIM file downloaded (e.g., wikipedia_en_all_maxi.zim).
2.  Clone the repository:

```bash
git clone https://github.com/your-username/your-project.git
```

3.  Navigate to the project directory:

```bash
cd your-project
```

4.  Open the `index.html` file in your browser.

## Usage

1.  Select a model from the dropdown list. This model will be used for both extracting key terms and generating the final response.
2.  Type your prompt in the input field.
3.  Click the "Send" button.
4.  The response from Ollama will be displayed in the output div.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

MIT