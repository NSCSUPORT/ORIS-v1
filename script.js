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
        // Simula a execução de um processo quântico
        terminalOutput.innerHTML += "<br><span class='output'>Initializing Quantum Process...</span>";

        // Exemplo de encoder de um comando Q#
        const qsharpCode = "H(qubit); M(qubit);";  // Exemplo de código Q#

        terminalOutput.innerHTML += `<br><span class="output">Executing Q# Command: ${qsharpCode}</span>`;

        const result = await executeQSharpSimulation(qsharpCode);

        terminalOutput.innerHTML += `<br><span class="output">Quantum Process Completed: ${result}</span>`;
    } catch (error) {
        terminalOutput.innerHTML += "<br><span class='output'>Error: " + error.message + "</span>";
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;  // Desce para o final do terminal
}

// Função simulada para executar o comando Q#
async function executeQSharpSimulation(qsharpCode) {
    return new Promise((resolve, reject) => {
        try {
            // Simulação de Q# -> JSQ (Processamento básico)
            if (qsharpCode.includes("H(qubit)")) {
                // Simula uma porta Hadamard (H) que coloca o qubit em superposição
                let qubit = Math.random() > 0.5 ? '0' : '1';
                if (qsharpCode.includes("M(qubit)")) {
                    // Simula a medição do qubit (colapsando a superposição)
                    resolve(`Qubit measured: ${qubit}`);
                }
            }
            resolve("Unknown Q# operation.");
        } catch (error) {
            reject(error);
        }
    });
}

inputField.addEventListener('keydown', handleInput);

const { exec } = require('child_process');

// Função para rodar um comando Bash
function runBashCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// Exemplo de comando Bash
runBashCommand('ls -l');
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

    // Simulação de comandos Bash
    if (command === 'ls') {
        terminalOutput.innerHTML += "<br><span class='output'>Documents  Downloads  Music  Pictures</span>";
    } else if (command === 'pwd') {
        terminalOutput.innerHTML += "<br><span class='output'>/home/user</span>";
    } else {
        terminalOutput.innerHTML += "<br><span class='output'>command not found: " + command + "</span>";
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;  // Desce para o final do terminal
}

inputField.addEventListener('keydown', handleInput);
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/run-bash', (req, res) => {
    exec('ls -l', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Erro: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`stderr: ${stderr}`);
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
