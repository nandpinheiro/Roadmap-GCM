# 🚀 Guia de Setup - Servidor Local

## Pré-requisitos

- **Node.js** (v14 ou superior) - [Download](https://nodejs.org/)
- **npm** (incluído no Node.js)

## Instalação Rápida

### 1️⃣ Instalar Dependências

```bash
npm install
```

Isso instalará o Express (framework web).

### 2️⃣ Iniciar o Servidor

```bash
npm start
```

Você verá a mensagem:
```
✅ Servidor rodando em http://localhost:3000
📁 Dados sendo salvos em: c:\...\fluxo\data.json
🌐 Acesse a aplicação em http://localhost:3000
```

### 3️⃣ Abrir a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## 📝 Como Usar

1. **Selecione conteúdos** - Marque os checkboxes dos tópicos que estuda
2. **Preencha os dados** - Adicione a data e suas observações
3. **Salve a fase** - Clique em "Salvar Fase" para guardar os dados

Os dados são salvos automaticamente em `data.json` na raiz do projeto.

## 🔍 Estrutura do Arquivo data.json

```json
{
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "phases": [
    {
      "timestamp": "2024-01-15T10:30:00.000Z",
      "faseNumero": 1,
      "faseTitulo": "Fundamentação Legal",
      "conteudos": {
        "conteudo-1": {
          "titulo": "Constituição Federal",
          "checked": true,
          "data": "2024-01-15",
          "observacao": "Revisão dos artigos sobre direitos"
        }
      }
    }
  ],
  "allProgress": []
}
```

## 🆘 Troubleshooting

### Erro: "Porta 3000 já está em uso"

**Solução:** Editar `server.js` e mudar a porta:

```javascript
const PORT = 3001; // Mude para 3001 ou outra porta disponível
```

### Erro: "Cannot find module 'express'"

**Solução:** Execute novamente:
```bash
npm install
```

### Dados não estão sendo salvos

1. Verifique se o servidor está rodando
2. Abra o console do navegador (F12) e procure por erros
3. Confirme que tem permissão de escrita na pasta

### O navegador mostra "Cannot GET /"

1. Verifique se o servidor iniciou sem erros
2. Tente acessar `http://localhost:3000` novamente
3. Limpe o cache do navegador (Ctrl+Shift+Del)

## 📊 APIs Disponíveis

### Salvar dados de uma fase
```
POST http://localhost:3000/api/save-phase
```

Exemplo com `curl`:
```bash
curl -X POST http://localhost:3000/api/save-phase \
  -H "Content-Type: application/json" \
  -d '{"faseNumero":1,"faseTitulo":"Fase 1","conteudos":{}}'
```

### Obter todos os dados
```
GET http://localhost:3000/api/data
```

### Obter dados de uma fase específica
```
GET http://localhost:3000/api/phase/1
```

## 🎯 Próximos Passos

1. ✅ Servidor rodando
2. ✅ Dados sendo salvos em `data.json`
3. 📦 (Opcional) Fazer backup regular de `data.json`
4. 🌐 (Opcional) Publicar em um servidor web para acesso remoto

---

**Dúvidas?** Verifique o arquivo README.md para mais informações!
