const express = require('express');
const axios = require('axios');
const AWS = require('aws-sdk');
const { Client } = require('pg');
const { DarkHoloFiEngine } = require('../src/kernel'); // Importando o kernel.js
const path = require('path');

const app = express();
const port = 3000;

// Configuração do AWS
AWS.config.update({
  region: 'us-east-1', // Substitua pela sua região AWS
  accessKeyId: 'SUA_ACCESS_KEY',
  secretAccessKey: 'SUA_SECRET_KEY'
});

const s3 = new AWS.S3();
const lambda = new AWS.Lambda();

// Inicializando o kernel com o endereço de autenticação
const engine = new DarkHoloFiEngine('enderecoDeAutenticacao'); // Passando o endereço de autenticação para o kernel

// Servir arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, '../public')));

// Função para conectar ao PostgreSQL e criar as tabelas usando ddl.js
const createDatabaseTables = async () => {
  const client = new Client({
    user: 'yourUsername',
    host: 'localhost',
    database: 'yourDatabase',
    password: 'yourPassword',
    port: 5432,
  });

  await client.connect();

  const query = `
    -- Tabela de Usuários
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await client.query(query);
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar as tabelas:', err.stack);
  } finally {
    client.end();
  }
};

// Chama a função para criar as tabelas no banco de dados ao iniciar o servidor
createDatabaseTables();

// API para iniciar o processo quântico
app.get('/api/quantum-process', async (req, res) => {
  try {
    // Simulação de dados de IoT e de usuário
    const dataFromIoT = { temperature: 22.5, humidity: 60, pressure: 1013 };
    const dataFromUser = { userActivity: 'loggedIn', transactionHistory: [{ amount: 100, type: 'deposit' }] };
    
    // Processando os dados
    const primaryData = { aggregatedData: { temperature: dataFromIoT.temperature, humidity: dataFromIoT.humidity } };
    const evolutionaryData = { adjustedData: { userActivity: dataFromUser.userActivity, optimizedTransaction: 100 } };
    const combinedData = { optimizedTemperature: primaryData.aggregatedData.temperature * 1.1, optimizedActivity: evolutionaryData.adjustedData.userActivity === 'loggedIn' ? 'active' : 'inactive', totalTransactionAmount: evolutionaryData.adjustedData.optimizedTransaction };

    // Investindo no Kernel e armazenando no S3
    engine.addPlan("Plano de Investimento em Rede Neural", "CNN", 1000, "16 GFLOPS", 5);
    engine.invest("Plano de Investimento em Rede Neural", 500, "EnderecoDoInvestidor");

    const s3Params = { Bucket: 'meu-bucket', Key: 'dados_otimizados.json', Body: JSON.stringify(combinedData), ContentType: 'application/json' };
    await s3.putObject(s3Params).promise();

    // Retornando a resposta
    res.json({ message: 'Quantum process executed successfully with evolutionary learning!', result: combinedData });
  } catch (error) {
    console.error('Error executing quantum process:', error);
    res.status(500).json({ message: 'Error executing quantum process', error: error.message });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
