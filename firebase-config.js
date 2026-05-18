/**
 * ⚙️ CONFIGURAÇÃO FIREBASE REALTIME DATABASE
 * 
 * ✅ INSTRUÇÕES PARA CONFIGURAR:
 * 1. Acesse: https://console.firebase.google.com
 * 2. Clique em "Criar Projeto" → Nome: roadmap-gcm → Criar
 * 3. Vá para "Realtime Database" → "Criar Banco de Dados"
 * 4. Localização: South America (São Paulo) → Iniciar em modo teste
 * 5. Clique em "Configurações do Projeto" (⚙️)
 * 6. Na aba "Seu aplicativo", clique em "Configuração web"
 * 7. Copie os valores abaixo e preencha:
 */

// 🔑 CONFIGURE SUAS CREDENCIAIS DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyDKd_R4-p9pZ5k7x8z0uJ6m3n4o5pQ6rS7t",           // ← Cole aqui
  authDomain: "roadmap-gcm.firebaseapp.com",                      // ← Cole aqui
  databaseURL: "https://roadmap-gcm-default-rtdb.firebaseio.com", // ← Cole aqui
  projectId: "roadmap-gcm",                                       // ← Cole aqui
  storageBucket: "roadmap-gcm.appspot.com",                       // ← Cole aqui
  messagingSenderId: "123456789",                                 // ← Cole aqui
  appId: "1:123456789:web:abcdefghijklmnop"                      // ← Cole aqui
};

// Inicializar Firebase
let db = null;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  console.log('✅ Firebase inicializado com sucesso!');
} catch (error) {
  console.warn('⚠️ Firebase não configurado. Use localStorage apenas.', error);
}

/**
 * 💾 Salvar dados em Firebase (sincronização na nuvem)
 */
async function saveToFirebase(data) {
  try {
    if (!db) {
      console.warn('⚠️ Firebase não configurado');
      return {
        success: true,
        message: '⚠️ Firebase não configurado - dados salvos localmente',
        offline: true
      };
    }

    const userId = localStorage.getItem('userId') || 'user-' + Date.now();
    localStorage.setItem('userId', userId);
    
    const timestamp = new Date().toISOString();
    
    // Salvar dados com timestamp
    await db.ref(`users/${userId}/progress`).set({
      ...data,
      timestamp: timestamp,
      syncedAt: timestamp
    });

    console.log('✅ Dados sincronizados com Firebase!');
    return {
      success: true,
      message: '✅ Dados sincronizados com sucesso na nuvem!',
      timestamp: timestamp,
      offline: false
    };

  } catch (error) {
    console.error('❌ Erro ao sincronizar com Firebase:', error);
    return {
      success: false,
      message: '⚠️ Erro ao sincronizar - dados salvos localmente',
      offline: true,
      error: error.message
    };
  }
}

/**
 * 📥 Carregar dados do Firebase
 */
async function loadFromFirebase() {
  try {
    if (!db) return null;

    const userId = localStorage.getItem('userId');
    if (!userId) return null;

    const snapshot = await db.ref(`users/${userId}/progress`).once('value');
    const data = snapshot.val();

    if (data) {
      console.log('✅ Dados carregados do Firebase!');
      return data;
    }
    
    return null;

  } catch (error) {
    console.error('❌ Erro ao carregar do Firebase:', error);
    return null;
  }
}

/**
 * 🔄 Sincronização em tempo real
 */
function setupRealtimeSync() {
  if (!db) return;

  const userId = localStorage.getItem('userId');
  if (!userId) return;

  db.ref(`users/${userId}/progress`).on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log('📡 Dados sincronizados em tempo real!');
      updateUIFromCloudData(data);
    }
  });
}

/**
 * 🎨 Atualizar UI com dados da nuvem
 */
function updateUIFromCloudData(data) {
  if (!data.conteudos) return;

  Object.entries(data.conteudos).forEach(([id, conteudo]) => {
    const storageKey = `conteudo-${id}`;
    localStorage.setItem(storageKey, JSON.stringify({
      checked: conteudo.checked,
      data: conteudo.data,
      observacao: conteudo.observacao
    }));
  });

  if (typeof initializeConteudos === 'function') {
    initializeConteudos();
  }
  if (typeof updatePhaseProgress === 'function') {
    updatePhaseProgress();
  }
}

    reader.onerror = () => reject('Erro ao ler arquivo');
    reader.readAsText(file);
  });
}

// INSTRUÇÕES DE USO:
// 
// 1. CONFIGURAR FIREBASE:
//    - Descomente as linhas 46-47 após configurar as credenciais
//    - Adicione o script do Firebase no HTML: <script src="https://www.gstatic.com/firebaselibs/[VERSION]/firebase-app.js"></script>
//    - Adicione também: <script src="https://www.gstatic.com/firebaselibs/[VERSION]/firebase-database.js"></script>
//
// 2. USAR AS FUNÇÕES:
//    - saveToFirebase(allData) - Salva dados no Firebase
//    - loadFromFirebase() - Carrega dados do Firebase
//    - syncInRealtime() - Sincroniza em tempo real
//    - exportDataAsJSON() - Exporta backup em JSON
//    - importDataFromJSON(file) - Importa dados de arquivo JSON
//
// 3. BACKUP AUTOMÁTICO:
//    - Os dados são salvos automaticamente no localStorage
//    - Use exportDataAsJSON() para criar backup
//    - Use importDataFromJSON() para restaurar backup
