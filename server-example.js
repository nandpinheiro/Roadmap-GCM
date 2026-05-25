/**
 * SERVIDOR NODE.JS/EXPRESS PARA SINCRONIZAÇÃO DE PROGRESSO
 * 
 * Este é um exemplo de como criar seu próprio servidor
 * ao invés de usar Firebase.
 * 
 * INSTALAÇÃO:
 * 1. npm init -y
 * 2. npm install express cors
 * 3. node server-example.js
 * 4. Servidor estará em http://localhost:3000
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Diretório para armazenar dados
const dataDir = './user-data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('✓ Diretório ./user-data criado');
}

// ============================================
// ROTA: Salvar Progresso
// ============================================
app.post('/api/save-progress', (req, res) => {
  try {
    const userId = req.body.userId || 'default';
    const { conteudos, dailyTasks } = req.body;

    // Validar dados
    if (!conteudos) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados de conteúdos não encontrados' 
      });
    }

    // Caminho do arquivo
    const filePath = path.join(dataDir, `${sanitizeUserId(userId)}.json`);

    // Dados a salvar
    const dataToSave = {
      userId,
      timestamp: new Date().toISOString(),
      conteudos,
      dailyTasks: dailyTasks || {}
    };

    // Salvar arquivo
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));

    console.log(`✓ Progresso salvo para usuário: ${userId}`);
    
    res.json({
      success: true,
      message: 'Progresso salvo com sucesso!',
      timestamp: dataToSave.timestamp
    });

  } catch (error) {
    console.error('❌ Erro ao salvar:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao salvar progresso',
      error: error.message
    });
  }
});

// ============================================
// ROTA: Carregar Progresso
// ============================================
app.get('/api/load-progress/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const filePath = path.join(dataDir, `${sanitizeUserId(userId)}.json`);

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      console.log(`✓ Progresso carregado para usuário: ${userId}`);
      
      res.json({
        success: true,
        data: parsedData
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Dados não encontrados para este usuário'
      });
    }

  } catch (error) {
    console.error('❌ Erro ao carregar:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao carregar progresso',
      error: error.message
    });
  }
});

// ============================================
// ROTA: Sincronizar (Salvar e Carregar)
// ============================================
app.post('/api/sync-progress', (req, res) => {
  try {
    const userId = req.body.userId || 'default';
    const { conteudos, dailyTasks } = req.body;

    // Salvar
    const filePath = path.join(dataDir, `${sanitizeUserId(userId)}.json`);
    const dataToSave = {
      userId,
      timestamp: new Date().toISOString(),
      conteudos,
      dailyTasks: dailyTasks || {}
    };

    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));

    // Carregar (em caso de sincronização com múltiplos dispositivos)
    const savedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`✓ Sincronização realizada para usuário: ${userId}`);

    res.json({
      success: true,
      message: 'Sincronização realizada com sucesso!',
      data: savedData
    });

  } catch (error) {
    console.error('❌ Erro ao sincronizar:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao sincronizar progresso',
      error: error.message
    });
  }
});

// ============================================
// ROTA: Listar Todos os Usuários
// ============================================
app.get('/api/users', (req, res) => {
  try {
    const files = fs.readdirSync(dataDir);
    const users = files
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        userId: f.replace('.json', ''),
        file: f
      }));

    res.json({
      success: true,
      totalUsers: users.length,
      users
    });

  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar usuários'
    });
  }
});

// ============================================
// ROTA: Deletar Dados de Um Usuário
// ============================================
app.delete('/api/delete-progress/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const filePath = path.join(dataDir, `${sanitizeUserId(userId)}.json`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ Dados deletados para usuário: ${userId}`);
      
      res.json({
        success: true,
        message: `Dados do usuário ${userId} foram deletados`
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Dados não encontrados para este usuário'
      });
    }

  } catch (error) {
    console.error('❌ Erro ao deletar:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar progresso'
    });
  }
});

// ============================================
// ROTA: Exportar Todos os Dados
// ============================================
app.get('/api/export-all', (res) => {
  try {
    const files = fs.readdirSync(dataDir);
    const allData = {};

    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(dataDir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        allData[file.replace('.json', '')] = JSON.parse(data);
      }
    });

    res.json({
      success: true,
      exportDate: new Date().toISOString(),
      totalUsers: Object.keys(allData).length,
      data: allData
    });

  } catch (error) {
    console.error('❌ Erro ao exportar:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao exportar dados'
    });
  }
});

// ============================================
// ROTA: Status do Servidor
// ============================================
app.get('/api/status', (req, res) => {
  try {
    const files = fs.readdirSync(dataDir);
    const userCount = files.filter(f => f.endsWith('.json')).length;

    res.json({
      status: 'online',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      dataDirectory: dataDir,
      totalUsers: userCount,
      uptime: process.uptime()
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// ============================================
// FUNÇÃO: Sanitizar ID do Usuário
// ============================================
function sanitizeUserId(userId) {
  return userId.replace(/[^a-zA-Z0-9_-]/g, '_');
}

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║    Servidor Roadmap GCM está ONLINE    ║');
  console.log(`║    Porta: ${PORT}                          ║`);
  console.log(`║    URL: http://localhost:${PORT}      ║`);
  console.log('╚════════════════════════════════════════╝\n');
  
  console.log('📚 Rotas Disponíveis:');
  console.log('   POST   /api/save-progress        - Salvar progresso');
  console.log('   GET    /api/load-progress/:id   - Carregar progresso');
  console.log('   POST   /api/sync-progress        - Sincronizar progresso');
  console.log('   GET    /api/users               - Listar usuários');
  console.log('   DELETE /api/delete-progress/:id - Deletar dados');
  console.log('   GET    /api/export-all          - Exportar todos os dados');
  console.log('   GET    /api/status              - Status do servidor');
  console.log('\n');
});

// Tratar erros não capturados
process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
});

/*
╔════════════════════════════════════════════════════════════════════╗
║                      EXEMPLOS DE USO COM CURL                     ║
╠════════════════════════════════════════════════════════════════════╣

1. SALVAR PROGRESSO:
───────────────────────────────────────────────────────────────────
curl -X POST http://localhost:3000/api/save-progress \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "conteudos": {
      "c1-1": {
        "titulo": "CF/88",
        "checked": true,
        "data": "2026-05-15"
      }
    }
  }'

2. CARREGAR PROGRESSO:
───────────────────────────────────────────────────────────────────
curl http://localhost:3000/api/load-progress/user123

3. SINCRONIZAR:
───────────────────────────────────────────────────────────────────
curl -X POST http://localhost:3000/api/sync-progress \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "conteudos": {...}}'

4. VER STATUS:
───────────────────────────────────────────────────────────────────
curl http://localhost:3000/api/status

5. LISTAR USUÁRIOS:
───────────────────────────────────────────────────────────────────
curl http://localhost:3000/api/users

╚════════════════════════════════════════════════════════════════════╝

COMO INTEGRAR NO HTML:

1. Abra firebase-config.js
2. Modifique submitAllData():
   
   const response = await fetch('http://localhost:3000/api/sync-progress', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       userId: generateOrGetUserId(),
       conteudos: allData.conteudos,
       dailyTasks: allData.dailyTasks
     })
   });

3. Teste a sincronização no HTML!

*/
