document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const promptInput = document.getElementById('prompt');
    const sendButton = document.getElementById('send');

    sendButton.addEventListener('click', async () => {
        const prompt = promptInput.value;
        output.textContent = ''; // Limpiar el output anterior

        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'phi4-mini:latest',
                    prompt: prompt,
                    stream: true
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

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
            console.error('Error:', error);
            output.textContent = `Error: ${error.message}`;
        }
    });
});