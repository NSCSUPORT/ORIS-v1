// main.js

// Aguarda o carregamento do DOM para garantir que os elementos estejam disponíveis
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const terminalOutput = document.getElementById('terminalOutput');

    // Define a função global 'appendOutput' para uso tanto no main.js quanto no comandos.js
    window.appendOutput = function(text) {
        terminalOutput.innerHTML += `<br>${text}`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    // Função para processar os comandos digitados
    function processCommand(command) {
        const trimmedCommand = command.trim(); // Remove espaços extras
        console.log(`Command received: "${trimmedCommand}"`); // Depuração do comando recebido
        if (comandos[trimmedCommand]) {
            comandos[trimmedCommand](); // Executa o comando se existir no objeto 'comandos'
        } else {
            appendOutput(`Command not found: ${trimmedCommand}`);
        }
    }

    // Listener para capturar quando o usuário pressiona "Enter"
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const userInput = inputField.value.trim();
            if (userInput) {
                appendOutput(`<span>$</span> ${userInput}`);
                inputField.value = '';
                processCommand(userInput);
            }
        }
    });
});
