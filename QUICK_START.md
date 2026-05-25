# 🚀 Início Rápido — Sistema de Progresso Roadmap

Bem-vindo ao seu novo sistema de acompanhamento de estudos com sincronização em nuvem!

---

## ✅ O que foi adicionado?

### 1️⃣ **Barra de Progresso por Disciplina**
- Veja o percentual de conclusão de cada fase
- A barra atualiza automaticamente conforme você marca itens

### 2️⃣ **Checkboxes com Campos de Preenchimento**
- Marque um conteúdo como concluído
- Preencha a data de finalização
- Adicione observações/anotações
- Tudo é salvo automaticamente!

### 3️⃣ **Botão para Enviar Progresso**
- Sincronize seus dados com a nuvem
- Acesse seu progresso de qualquer dispositivo
- Backup automático sempre disponível

### 4️⃣ **Banco de Dados Online (Firebase)**
- Seus dados seguros na nuvem
- Sincronização em tempo real (opcional)
- Backup em JSON para download local

---

## 🎯 Primeiros Passos

### Usar SEM Firebase (Salvamento Local)
1. Abra `index.html` no navegador
2. Clique em "📚 Conteúdos"
3. Marque os checkboxes dos conteúdos que completou
4. Preencha data e observação (opcional)
5. Clique em "📤 Enviar Progresso" para fazer backup

**Vantagem:** Funciona offline, sem configuração
**Desvantagem:** Dados ficam apenas no seu dispositivo

---

### Usar COM Firebase (Sincronização em Nuvem)

#### Passo 1: Criar Conta no Firebase
- Acesse [Firebase Console](https://console.firebase.google.com)
- Clique "Criar Projeto" (nome: "GCM-Roadmap")
- Ative Google Analytics (opcional)

#### Passo 2: Criar Realtime Database
1. Vá para "Realtime Database"
2. Clique "Criar Banco de Dados"
3. Escolha localização "South America - São Paulo"
4. Inicie em "Modo Teste"
5. Clique "Ativar"

#### Passo 3: Copiar Credenciais
1. Clique ⚙️ (Configurações) no topo
2. Aba "Geral"
3. Role para "Seus apps"
4. Clique `</>` para app da web
5. **Copie o objeto `firebaseConfig`**

#### Passo 4: Colar no Código
1. Abra `firebase-config.js`
2. Substitua linhas 11-18 com suas credenciais
3. **Salve o arquivo**

#### Passo 5: Ativar no HTML
1. Abra `index.html`
2. Procure por `<!-- Firebase Scripts`
3. **Descomente** as duas linhas (remova `<!--` e `-->`)
4. **Salve o arquivo**

#### Passo 6: Testar
1. Recarregue a página
2. Marque um checkbox
3. Clique "Enviar Progresso"
4. Deve aparecer "✓ Sincronizado com sucesso!"

---

## 📊 Visualizar Progresso

### Dashboard de Fases
- Cada fase mostra: `X/Y (Z%)`
  - X = conteúdos concluídos
  - Y = total de conteúdos
  - Z% = percentual

### Exemplo:
```
✓ Fase 1: Base Constitucional
  Progresso: 3/4 (75%)
  ████████░ 75%
```

---

## 💾 Fazer Backup

### Backup Automático
- Clique "Enviar Progresso" regularmente
- Um backup é criado a cada envio

### Exportar para Arquivo
```javascript
// Cole no console (F12 > Console):
exportDataAsJSON()
// Um arquivo JSON será baixado com seus dados
```

### Restaurar Backup
```javascript
// Cole no console:
importDataFromJSON(file)
// Selecione o arquivo JSON baixado
```

---

## 🔄 Sincronizar Entre Dispositivos

### Com Firebase Ativado
1. Acesse em outro dispositivo/computador
2. Os dados aparecem automaticamente
3. Ou clique "Enviar Progresso" para forçar sincronização

### Sem Firebase
1. Exporte dados: `exportDataAsJSON()`
2. Em outro dispositivo: `importDataFromJSON(file)`

---

## 🆘 Problemas Comuns

### ❌ "Dados salvos localmente" (sem Firebase)
**Solução:** Firebase não está ativado. Siga passos 4-5 acima.

### ❌ Firebase mostra erro
1. Verifique credenciais em `firebase-config.js`
2. Confirme regras de segurança no Firebase
3. Recarregue a página

### ❌ Checkbox não abre campos
1. Recarregue F5
2. Abra DevTools (F12 > Console)
3. Procure por mensagens de erro

### ❌ Dados não sincronizam
1. Clique "Enviar Progresso" manualmente
2. Verifique conexão de internet
3. Aguarde 2-3 segundos

---

## 📱 Usar em Outro Dispositivo

### Mobile
1. Abra o link em seu smartphone/tablet
2. Funciona igual ao desktop
3. Dados sincronizam automaticamente (com Firebase)

### Entre Computadores
1. Desktop: Clique "Enviar Progresso"
2. Notebook: Acesse o mesmo link
3. Dados aparecem (com Firebase) ou importe manualmente

---

## 🎨 Personalizações Possíveis

### Mudar Cores
Edite `index.html`, procure por:
```css
--primary: #6366f1;
--accent: #ec4899;
```

### Adicionar Mais Conteúdos
Edite `index.html`, procure `conteudosFases`:
```javascript
{
  id: 'c1-5',
  titulo: 'Novo Conteúdo',
  desc: 'Descrição'
}
```

### Mudar Datas
Procure `dailySchedule` em `index.html`

---

## 📚 Estrutura de Arquivos

```
📁 fluxo/
├── index.html              # Arquivo principal
├── firebase-config.js      # Configuração do Firebase
├── README.md               # Documentação completa
└── QUICK_START.md          # Este arquivo
```

---

## ✨ Dicas Úteis

- 💡 Preench dados de observação para lembrar o que aprendeu
- 📅 Use o campo de data para rastrear quando finalizou
- 🔄 Sincronize regularmente para não perder dados
- 📊 Acompanhe o % de progresso para se motivar
- 💾 Faça backup mensal em JSON

---

## 🎯 Próximos Passos

1. ✅ Marque seus primeiros conteúdos concluídos
2. ✅ Configure Firebase (opcional)
3. ✅ Clique "Enviar Progresso" regularmente
4. ✅ Monitore seu percentual de conclusão
5. ✅ Estude com confiança! 📚

---

## 📞 Precisa de Ajuda?

1. Consulte [README.md](README.md) para documentação completa
2. Abra DevTools (F12) e verifique console para erros
3. Verifique arquivos `.js` comentados com explicações

---

**Boa sorte na sua aprovação! 🎓🚀**

_Criado com ❤️ para sua jornada de estudos_
