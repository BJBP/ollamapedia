document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const promptInput = document.getElementById('prompt');
    const sendButton = document.getElementById('send');
    const searchResultsDiv = document.getElementById('search-results'); // Para mostrar resultados de Kiwix
    const articleContentDiv = document.getElementById('article-content'); // Y el contenido del artículo.

    const ollamaEndpoint = 'http://localhost:11434/api/generate'; // URL de Ollama
    const kiwixServerIP = "192.168.1.114";  // IP de Kiwix
    const kiwixServerPort = "80";          // Puerto de Kiwix

    // Función para buscar en Kiwix y formatear resultados
    async function searchKiwix(searchTerm) {
        const url = `http://${kiwixServerIP}:${kiwixServerPort}/search?pattern=${encodeURIComponent(searchTerm)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 400) { return []; } // No results
                throw new Error(`Kiwix HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const results = doc.querySelectorAll('div.results ul li a');

            const kiwixResults = [];
            for (const result of results) {
                const link = result.getAttribute('href');
                const title = result.textContent;
                const articleText = await fetchArticleText(link);
                const resumen = extractSummary(articleText);
                const contenidoArticulo = articleText; // Or a longer summary if full text is too long

                 kiwixResults.push({
                    termino: searchTerm,
                    titulo_articulo: title,
                    resumen: resumen, // Keep the short summary
                    contenido_articulo: contenidoArticulo, // Add the full content
                    contexto_adicional: [],
                });
            }
            return kiwixResults;

        } catch (error) {
            console.error("Error searching Kiwix:", error);
            return []; // Return empty array on error
        }
    }

     // Función auxiliar para obtener el texto del artículo
    async function fetchArticleText(articleUrl) {
       const fullUrl = `http://${kiwixServerIP}:${kiwixServerPort}${articleUrl}`;
        try {
            const response = await fetch(fullUrl);
            if (!response.ok) {
              throw new Error("Error al obtener texto de artículo")
            }
           const html = await response.text();
           const parser = new DOMParser();
           const doc = parser.parseFromString(html, 'text/html');
           const content = doc.querySelector('div.mw-parser-output');
           if (!content) return '';
           const firstParagraph = content.querySelector('p');
           return firstParagraph ? firstParagraph.textContent : '';

        } catch(error){
          console.error("Error en fetch", error);
          return "";
        }

    }


    // Función auxiliar para extraer un resumen del texto del artículo
    function extractSummary(articleText) {
      // Implementar lógica para extraer el resumen
      //  - Opción simple: Primeras N palabras
      //  - Opción mejor: Buscar la primera oración/párrafo completo
      //  - Opción avanzada: Usar técnicas de NLP para resumen (pero esto es más complejo)
        const maxLength = 200; // Longitud máxima del resumen
        if(articleText.length <= maxLength){
          return articleText;
        }
        const firstSentence = articleText.split('.')[0] + '.'; // Obtiene la primera oración completa
        return firstSentence.length > 50 ? firstSentence : articleText.substring(0, maxLength) + "...";
    }

    sendButton.addEventListener('click', async () => {
        const userPrompt = promptInput.value;
        output.textContent = 'Procesando...';

        // 1. Extraer términos clave (usando el LLM)
        let keyTerms = [];
        try {
            const termsResponse = await fetch(ollamaEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'phi4-mini:latest',
                    prompt: `Extract always the most important keyword from the following query and return it as a JSON array. The keyword should be the one that best represents the main topic of the query. If the query contains several important keywords, select the one that is most specific and relevant to the overall context. Ensure that the extracted keyword is a noun or a noun phrase that captures the essence of the query. If the query is vague or ambiguous, try to identify the underlying intention and choose the keyword that best aligns with that intention. If the query contains grammatical or spelling errors, correct the errors before extracting the keyword. If the query is in a language other than English, translate it to English before extracting the keyword. If the query is a question, extract the keyword that represents the subject of the question. If the query is a command, extract the keyword that represents the object of the command. If the query is a statement, extract the keyword that represents the subject of the statement. If you cannot identify an important keyword, return an empty JSON array. Query: \"${userPrompt}\". Response format: {\"keywords\": [\"keyword\"]}`,
                    stream: false,
                    format: 'json'
                })
            });

            if (!termsResponse.ok) {
                throw new Error(`Ollama (terms) HTTP error: ${termsResponse.status}`);
            }
            const termsData = await termsResponse.json();

            try {
                // Intentar parsear la respuesta como JSON directamente
                const rawResponse = termsData.response;
                const trimmedResponse = rawResponse.trim();
                console.log("Raw Ollama response:", rawResponse);
                console.log("Trimmed Ollama response:", trimmedResponse);
                const parsedResponse = JSON.parse(trimmedResponse);
                keyTerms = parsedResponse.keywords;

                // Verificar si keyTerms es un array
                if (!Array.isArray(keyTerms)) {
                    throw new Error("La respuesta no es un array.");
                }


            } catch (jsonError) {
                console.error("Error al parsear la lista de términos:", jsonError);
                output.textContent = "Error al procesar los términos clave.";
                return; // Salir si hay un error
            }

        } catch (error) {
            console.error('Error extracting terms:', error);
            output.textContent = `Error: ${error.message}`;
            return; // Importante: salir si hay un error aquí
        }


        // 2. Buscar en Kiwix cada término clave
        let kiwixContext = [];
        if (keyTerms.length > 0) {
            const results = await searchKiwix(keyTerms[0]);
            if (results.length > 0) {
                kiwixContext = [results[0]]; // Only take the first result
             }
        }

        // 3. Construir el prompt final para el LLM
        const contextPrompt = kiwixContext.length > 0
            ? `Contexto de Wikipedia en json:\n${JSON.stringify(kiwixContext.map(item => ({
                termino: item.termino,
                titulo_articulo: item.titulo_articulo,
                contenido_articulo: item.contenido_articulo
            })), null, 2)}\n\n`
            : "No se encontró contexto relevante en Wikipedia.\n\n";

        console.log("User prompt:", userPrompt);
        console.log("Key terms:", keyTerms);
        console.log("Kiwix context:", kiwixContext.map(item => ({
            termino: item.termino,
            titulo_articulo: item.titulo_articulo,
            contenido_articulo: item.contenido_articulo
        })));

        const finalPrompt = `${contextPrompt}. Responde la siguiente pregunta: ${userPrompt}`;
        console.log("Final prompt:", finalPrompt);

        // 4. Enviar el prompt final a Ollama y mostrar la respuesta en streaming
        try {
            const response = await fetch(ollamaEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'phi4-mini:latest',
                    prompt: finalPrompt,
                    stream: true,
                    format: 'json'
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama (final) HTTP error: ${response.status}`);
            }

            output.textContent = ''; // Limpiar antes de la respuesta final
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) { break; }
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    try {
                        const json = JSON.parse(line);
                        output.textContent += json.response;
                    } catch (error) {
                        console.error('Error parsing JSON:', line, error);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching final response:', error);
            output.textContent = `Error: ${error.message}`;
        }
        promptInput.value = '';
    });
});