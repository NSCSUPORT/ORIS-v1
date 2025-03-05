// main.js
  document.getElementById("connection-form").addEventListener("submit", function (event) {
            event.preventDefault();

            const awsKey = document.getElementById("aws-key").value;
            const azureKey = document.getElementById("azure-key").value;
            const wanpId = document.getElementById("wanp-id").value;
            const service = document.getElementById("service").value;

            if (!awsKey && !azureKey && !wanpId) {
                alert("Erro: Nenhuma chave de servidor foi inserida! Pelo menos um campo deve ser preenchido.");
                return;
            }

            // Chamar a função do arquivo quantum-process.js
            if (typeof processConnectionData === "function") {
                processConnectionData(awsKey, azureKey, wanpId, service);
                alert("Conectado com sucesso ao serviço: " + service.toUpperCase());
                enableMultipleServers(); // Ativar conexão com múltiplos servidores
            } else {
                alert("Erro: O arquivo quantum-process.js não foi carregado corretamente!");
            }
        });

        function enableMultipleServers() {
            const serviceDropdown = document.getElementById("service");
            const connectButton = document.querySelector(".submit-btn");
            // Adicionando uma opção para múltiplos servidores
            const multipleServerOption = document.createElement("option");
            multipleServerOption.value = "multi";
            multipleServerOption.text = "Conectar a múltiplos servidores";
            serviceDropdown.appendChild(multipleServerOption);
            connectButton.textContent = "Conectar a múltiplos servidores";
        }
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
