# 📚 Roadmap GCM - Guarda Civil Municipal

Sistema de planejamento e acompanhamento de estudos para o concurso da **Guarda Civil Municipal**, com sincronização em nuvem através do **Firebase**.

🌐 **Acesse agora:** https://nandpinheiro.github.io/Roadmap-GCM

---

## ✨ Funcionalidades

- ✅ **5 Fases de Estudo** com conteúdos específicos
- 📊 **Barra de Progresso** por disciplina
- ✔️ **Checkboxes** para marcar conteúdos estudados
- 📅 **Data e Observações** para cada item
- 💾 **Sincronização Automática** com Firebase
- 🔄 **Acesso em Qualquer Dispositivo** (desktop, tablet, celular)
- 🚀 **Hospedado no GitHub Pages** (gratuito)

---

## 🚀 Como Usar

### 1. Abrir a Aplicação

Acesse: https://nandpinheiro.github.io/Roadmap-GCM

### 2. Estudar

- Selecione os checkboxes dos conteúdos que está estudando
- Preencha a **data** e suas **observações**
- Veja a barra de progresso atualizar em tempo real

### 3. Salvar

Clique em **"Salvar Fase"** para sincronizar os dados:
- 📱 No seu navegador (localStorage)
- ☁️ Na nuvem (Firebase)

### 4. Acessar em Outro Dispositivo

- Abra a aplicação em outro dispositivo
- Os mesmos dados aparecerão automaticamente!

---

## 🔧 Configuração Firebase (Primeira Vez)

Se ainda não configurou o Firebase:

1. Siga o [guia de setup Firebase](FIREBASE_SETUP.md)
2. Após configurar, todos os dados estarão sincronizados

---

## 📱 Dispositivos Compatíveis

✅ Desktop (Windows, Mac, Linux)
✅ Tablet (iPad, Android)
✅ Smartphone (iPhone, Android)
✅ Qualquer navegador moderno

---

## 📁 Estrutura do Projeto

```
/
├── index.html              # Aplicação principal
├── firebase-config.js      # Configuração Firebase
├── package.json            # Metadados do projeto
├── FIREBASE_SETUP.md       # Guia de setup Firebase
├── README.md               # Este arquivo
└── data.json              # Dados locais (backup)
```

---

## 📊 Dados Salvos

Seus dados são armazenados em:

1. **localStorage** - Acesso rápido local
2. **Firebase Realtime Database** - Sincronização em nuvem

Estrutura:
```json
{
  "users": {
    "user-id": {
      "progress": {
        "2024-01-15T10:30:00Z": {
          "conteudos": {...},
          "timestamp": "..."
        }
      }
    }
  }
}
```

---

## 🎯 Phases (Fases)

### Fase 1: Fundamentação Legal
- Constituição Federal
- Lei Complementar Estadual
- Decretos e Portarias
- Ética e Cidadania

### Fase 2: Direito Administrativo
- Princípios da Administração
- Atos Administrativos
- Servidores Públicos
- Licitações

### Fase 3: Direito Penal
- Parte Geral
- Crimes contra Pessoa
- Crimes contra Patrimônio
- Crimes contra Segurança

### Fase 4: Direito Processual Penal
- Teoria Geral
- Investigação
- Processos
- Recursos

### Fase 5: Conhecimentos Complementares
- Relações Humanas
- Segurança Pública
- Técnicas de Abordagem
- Comunicação

---

## 🔐 Privacidade e Segurança

- ✅ Seus dados são seus
- ✅ Só você pode acessar seus dados
- ✅ Firebase com criptografia SSL
- ✅ Sem rastreamento de terceiros

---

## 🐛 Troubleshooting

### Dados não sincronizam?
1. Verifique sua conexão com internet
2. Verifique se Firebase está configurado (veja [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
3. Abra o console (F12) e procure por erros

### "Permission denied" ao salvar?
1. Configure as regras de segurança do Firebase (passo 6 em [FIREBASE_SETUP.md](FIREBASE_SETUP.md))

### Dados desapareceram?
1. Seus dados estão salvos no localStorage
2. Abra o console (F12) e digite: `JSON.parse(localStorage.getItem('conteudo-1'))`

---

## 📞 Contribuir

Quer ajudar a melhorar?

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b melhoria`
3. Faça suas mudanças
4. Commit: `git commit -m "descrição"`
5. Push: `git push origin melhoria`
6. Abra um Pull Request

---

## 📄 Licença

MIT License - Você é livre para usar, modificar e distribuir

---

## 🙏 Créditos

Desenvolvido com ❤️ para quem está estudando para o concurso GCM

---

**Última atualização:** Maio 2024
**Versão:** 2.0.0
**Status:** ✅ Em produção

4. Escolha modo "Iniciar no modo Teste" (depois configurar segurança)
5. Clique em "Ativar"

#### Passo 3: Obter Credenciais
1. Vá para "Configurações do Projeto" (engrenagem no topo)
2. Na aba "Geral", role para baixo até "Seus apps"
3. Clique em `</>` para adicionar um novo app da web
4. Insira o nome (ex: "Roadmap App")
5. Copie o objeto `firebaseConfig`

#### Passo 4: Configurar o Código
1. Abra o arquivo `firebase-config.js`
2. Substitua as linhas 11-18 com suas credenciais:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto.firebaseio.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123...:web:abc..."
};
```

#### Passo 5: Ativar Firebase no HTML
Abra `index.html` e descomente essas linhas (no final do arquivo):
```html
<!-- Firebase Scripts (descomente para usar Firebase) -->
<script src="https://www.gstatic.com/firebaselibs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebaselibs/9.22.0/firebase-database.js"></script>
```

E descomente essas linhas no `firebase-config.js` (linhas 45-47):
```javascript
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
```

#### Passo 6: Configurar Regras de Segurança
1. No Firebase Console, vá para "Realtime Database" > "Regras"
2. Substitua pelo código abaixo (permite acesso sem autenticação para teste):
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid == $uid || $uid == null",
        ".write": "auth.uid == $uid || $uid == null"
      }
    }
  }
}
```

⚠️ **Importante**: Essa configuração é apenas para testes. Para produção, implemente autenticação adequada.

---

### Opção 2: Usando Seu Próprio Servidor

Se preferir não usar Firebase, você pode criar um backend simples com Node.js/Express:

#### Passo 1: Criar o Backend

Crie um arquivo `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const dataDir = './data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Salvar dados
app.post('/api/save-progress', (req, res) => {
  const { userId, conteudos, dailyTasks } = req.body;
  const filePath = path.join(dataDir, `${userId || 'default'}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify({
    timestamp: new Date().toISOString(),
    conteudos,
    dailyTasks
  }, null, 2));
  
  res.json({ success: true, message: 'Dados salvos com sucesso!' });
});

// Carregar dados
app.get('/api/load-progress/:userId', (req, res) => {
  const filePath = path.join(dataDir, `${req.params.userId}.json`);
  
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Dados não encontrados' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

#### Passo 2: Atualizar firebase-config.js

Modifique a função `submitAllData()` em `firebase-config.js`:
```javascript
async function submitAllData() {
  const button = event.target.closest('.submit-button');
  const userId = generateOrGetUserId();
  
  button.classList.add('loading');
  button.textContent = '⏳ Sincronizando...';
  
  try {
    const allData = collectAllData();
    
    const response = await fetch('http://seu-servidor.com/api/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        conteudos: allData.conteudos,
        dailyTasks: allData.dailyTasks
      })
    });
    
    if (!response.ok) throw new Error('Erro no servidor');
    
    button.classList.remove('loading');
    button.textContent = '✓ Enviado com sucesso!';
    showSuccessMessage('Progresso sincronizado!');
    
  } catch (error) {
    button.textContent = '✗ Erro ao enviar';
    showSuccessMessage('Erro ao sincronizar');
  }
}
```

---

## 📱 Como Usar o Sistema

### Navegação Básica
1. Clique em "📚 Conteúdos" no menu principal
2. Veja todas as 5 fases do seu plano de estudo

### Marcar um Conteúdo como Concluído
1. Clique no checkbox ☑️ de um conteúdo
2. Os campos "Data de Finalização" e "Observação" aparecem
3. Preencha com:
   - **Data**: Quando você finalizou (ex: 15/05/2026)
   - **Observação**: Suas anotações (ex: "Precisei revisar art. 23-25")
4. Os dados são salvos automaticamente

### Enviar Progresso para a Nuvem
1. Role até o final da seção de Conteúdos
2. Clique no botão "📤 Enviar Progresso"
3. Aguarde a mensagem de sucesso
4. Seus dados estão sincronizados!

### Acessar em Outro Dispositivo
1. Abra o mesmo link em outro computador/tablet
2. Clique em "Enviar Progresso" (se usando Firebase)
3. Seus dados serão carregados automaticamente

### Fazer Backup Local
Se usando Firebase, você pode fazer backup:
1. Abra o console do navegador (F12)
2. Digite: `exportDataAsJSON()`
3. Um arquivo JSON será baixado com seu progresso completo

### Restaurar de um Backup
1. Use `importDataFromJSON(file)` no console
2. Selecione o arquivo de backup JSON
3. Seus dados serão restaurados

---

## 🔄 Sincronização em Tempo Real

Se quiser sincronizar automaticamente entre dispositivos:

1. Descomente a linha no `firebase-config.js`:
```javascript
syncInRealtime(); // Chamar após Firebase estar inicializado
```

2. Agora qualquer mudança em outro dispositivo aparecerá automaticamente

---

## 🛡️ Segurança e Privacidade

- ✅ Dados salvos localmente no navegador (localStorage)
- ✅ Cada usuário tem um ID único gerado automaticamente
- ✅ Dados enviados para nuvem com timestamp
- ✅ Backup automático disponível
- ⚠️ Configure regras de segurança adequadas no Firebase para produção

---

## 💾 Estrutura de Dados Salvos

Os dados são armazenados no seguinte formato:

```json
{
  "timestamp": "2026-05-16T10:30:00.000Z",
  "conteudos": {
    "c1-1": {
      "titulo": "CF/88 — arts. 1º ao 5º",
      "faseNumero": 1,
      "faseTitulo": "Base constitucional",
      "checked": true,
      "data": "2026-05-15",
      "observacao": "Revisar princípios fundamentais"
    }
  },
  "dailyTasks": {
    "s1": true,
    "s2": false
  }
}
```

---

## 🐛 Troubleshooting

### Firebase não sincroniza
- Verifique se as credenciais estão corretas
- Confirme se o Firebase está ativado na conta
- Verifique o console (F12) para mensagens de erro
- Verifique regras de segurança do banco de dados

### Dados não aparecem após sincronizar
- Recarregue a página
- Verifique o armazenamento no navegador (DevTools > Application > Local Storage)
- Exporte um backup para verificar os dados

### Erro "Firebase não está definido"
- Descomente os scripts do Firebase no HTML
- Verifique a velocidade de internet
- Aguarde alguns segundos para Firebase inicializar

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console (F12 > Console)
2. Copie mensagens de erro
3. Consulte documentação do Firebase: https://firebase.google.com/docs

---

**Desenvolvido com ❤️ para sua aprovação no concurso da GCM**
