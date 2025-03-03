const terminalOutput = document.getElementById('terminalOutput');
const inputField = document.getElementById('inputField');

function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value;
        inputField.value = '';
        processCommand(userInput);
    }
}

function processCommand(command) {
    terminalOutput.innerHTML += "<br><span class='output'>$ " + command + "</span>";  // Exibe o comando
    terminalOutput.innerHTML += "<br><span class='output'>Processing...</span>";

    if (command.toLowerCase() === "run quantum process") {
        runQuantumProcess();
    } else {
        terminalOutput.innerHTML += "<br><span class='output'>Unknown command: " + command + "</span>";
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;  // Desce para o final do terminal
}

async function runQuantumProcess() {
    try {
        const response = await fetch('/api/quantum-process', {
            method: 'GET'
        });

        if (response.ok) {
            const result = await response.json();
            terminalOutput.innerHTML += `<br><span class="output">Quantum Process Completed: ${result.message}</span>`;
        } else {
            terminalOutput.innerHTML += "<br><span class='output'>Error processing quantum data.</span>";
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;  // Desce para o final do terminal
    } catch (error) {
        terminalOutput.innerHTML += "<br><span class='output'>Error: " + error.message + "</span>";
    }
}

inputField.addEventListener('keydown', handleInput);
