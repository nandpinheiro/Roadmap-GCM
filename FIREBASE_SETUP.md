# 🔥 Setup Firebase - Sincronização na Nuvem

Este guia mostra como configurar o Firebase para sincronizar dados do Roadmap GCM em qualquer dispositivo através do GitHub Pages.

## ✅ Passo 1: Criar Projeto no Firebase

1. Acesse https://console.firebase.google.com
2. Clique em **"Criar Projeto"**
3. Nome: `roadmap-gcm`
4. Clique em **"Criar"**
5. Aguarde o projeto ser criado (2-3 minutos)

## ✅ Passo 2: Configurar Realtime Database

1. No menu esquerdo, vá para **"Realtime Database"** (ou Build → Realtime Database)
2. Clique em **"Criar banco de dados"**
3. Localização: **South America (São Paulo)**
4. Modo de segurança: **Iniciar em modo teste**
5. Clique em **"Habilitar"**

## ✅ Passo 3: Copiar Credenciais Firebase

1. Clique em ⚙️ **"Configurações do Projeto"** (canto superior direito)
2. Vá para a aba **"Seu aplicativo"**
3. Clique em **"Configuração web"** (ícone `</>`!)
4. Você verá um objeto com as credenciais:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDKd...",
  authDomain: "roadmap-gcm.firebaseapp.com",
  projectId: "roadmap-gcm",
  storageBucket: "roadmap-gcm.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789:web:abc...",
  databaseURL: "https://roadmap-gcm-default-rtdb.firebaseio.com"
};
```

## ✅ Passo 4: Atualizar firebase-config.js

1. Abra o arquivo `firebase-config.js` no seu projeto
2. Substitua os valores no objeto `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  databaseURL: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};
```

3. **Salve o arquivo**

## ✅ Passo 5: Fazer Commit e Push

```bash
git add firebase-config.js
git commit -m "🔥 Configurar Firebase para sincronização em nuvem"
git push origin main
```

## ✅ Passo 6: Configurar Regras de Segurança (Opcional)

Para proteger seus dados, no Firebase Console:

1. Vá para **Realtime Database** → aba **"Regras"**
2. Substitua o código por:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": "auth.uid === $uid",
        "progress": {
          ".read": "auth.uid === $uid",
          ".write": "auth.uid === $uid"
        }
      }
    }
  }
}
```

3. Clique em **"Publicar"**

## 🎉 Pronto!

Agora seu Roadmap GCM estará sincronizado em qualquer dispositivo!

### Como Usar:

1. Acesse seu site no GitHub Pages
2. Marque os checkboxes e preencha as informações
3. Clique em **"Salvar Fase"**
4. ✅ Os dados serão salvos:
   - 📱 Localmente no seu navegador (localStorage)
   - ☁️ Na nuvem (Firebase)
5. Acesse de outro dispositivo e verá os mesmos dados!

## 🐛 Troubleshooting

### Erro: "Cannot read property 'ref' of null"
**Solução:** As credenciais do Firebase não foram configuradas corretamente. Verifique `firebase-config.js`.

### Erro: "Permission denied"
**Solução:** Configure as regras de segurança do Firebase (veja passo 6).

### Dados não sincronizam
**Solução:** 
- Verifique a conexão com internet
- Verifique se Firebase está inicializado (abra console F12)
- Confirme que `firebase-config.js` tem as credenciais corretas

### "403 Forbidden" ao publicar em GitHub Pages
**Solução:** Isso é normal! O erro é do arquivo `.nojekyll`. Firebase funciona normalmente.

## 📚 Mais Informações

- [Documentação Firebase Realtime Database](https://firebase.google.com/docs/database)
- [GitHub Pages](https://pages.github.com/)
- [Como usar localStorage + Firebase](https://firebase.google.com/docs/database/web/start)
