#  Sistema de Gestão Acadêmica

Sistema completo para gerenciamento de cursos e alunos, com interface web moderna e intuitiva.

![Badge](https://img.shields.io/badge/Status-Ativo-success)
![Badge](https://img.shields.io/badge/Versão-1.0.0-blue)

---

##  Tecnologias Utilizadas

### Backend
- **API REST** - Hospedada em Render
- **Endpoint Base**: `https://av2-render.onrender.com`

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com:
  - Flexbox para layouts responsivos
  - Gradientes e animações
  - Transições suaves
  - Design responsivo
- **JavaScript (ES6+)** - Lógica da aplicação:
  - Fetch API para requisições HTTP
  - Async/Await para operações assíncronas
  - Manipulação do DOM
  - Gerenciamento de eventos

### Recursos Adicionais
- **Modais** - Para formulários de cadastro/edição
- **Tabs** - Sistema de navegação entre seções
- **Alertas** - Feedback visual para ações do usuário

---

##  Como Rodar Localmente

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com a internet (para acessar a API)

### Opção 1: Diretamente no Navegador
1. **Baixe o arquivo HTML**
   ```bash
   # Salve o código HTML em um arquivo
   # Exemplo: sistema-gestao.html
   ```

2. **Abra o arquivo**
   - Clique duas vezes no arquivo HTML
   - Ou arraste o arquivo para o navegador
   - Ou clique com botão direito → Abrir com → Navegador

3. **Pronto!** 
   - O sistema já estará funcionando
   - A API será acessada automaticamente

### Opção 2: Com Servidor Local (Recomendado)

#### Usando Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Usando Node.js (http-server)
```bash
# Instalar globalmente
npm install -g http-server

# Executar
http-server -p 8000
```

#### Usando PHP
```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: Com Live Server (VS Code)
1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito no arquivo HTML
3. Selecione "Open with Live Server"

---

##  Como Consumir a API

### Base URL
```
https://av2-render.onrender.com
```

---

##  Endpoints - CURSOS

### 1. Listar Todos os Cursos
```http
GET /cursos/
```

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "nome": "Engenharia de Software",
    "cargaHoraria": 3200
  },
  {
    "id": 2,
    "nome": "Ciência da Computação",
    "cargaHoraria": 3000
  }
]
```

**Exemplo com JavaScript:**
```javascript
const response = await fetch('https://av2-render.onrender.com/cursos/');
const cursos = await response.json();
console.log(cursos);
```

---

### 2. Buscar Curso por ID
```http
GET /cursos/{id}
```

**Parâmetros:**
- `id` (path) - ID do curso (integer)

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "nome": "Engenharia de Software",
  "cargaHoraria": 3200
}
```

**Exemplo com JavaScript:**
```javascript
const response = await fetch('https://av2-render.onrender.com/cursos/1');
const curso = await response.json();
```

---

### 3. Criar Novo Curso
```http
POST /cursos/
```

**Body (JSON):**
```json
{
  "nome": "Sistemas de Informação",
  "cargaHoraria": 2800
}
```

**Resposta de Sucesso:**
```json
{
  "id": 3,
  "nome": "Sistemas de Informação",
  "cargaHoraria": 2800
}
```

**Exemplo com JavaScript:**
```javascript
const novoCurso = {
  nome: "Sistemas de Informação",
  cargaHoraria: 2800
};

const response = await fetch('https://av2-render.onrender.com/cursos/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(novoCurso)
});

const cursoCriado = await response.json();
```

---

### 4. Atualizar Curso
```http
PUT /cursos/{id}
```

**Parâmetros:**
- `id` (path) - ID do curso (integer)

**Body (JSON):**
```json
{
  "nome": "Engenharia de Software - Atualizado",
  "cargaHoraria": 3400
}
```

**Exemplo com JavaScript:**
```javascript
const cursoAtualizado = {
  nome: "Engenharia de Software - Atualizado",
  cargaHoraria: 3400
};

const response = await fetch('https://av2-render.onrender.com/cursos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(cursoAtualizado)
});
```

---

### 5. Deletar Curso
```http
DELETE /cursos/{id}
```

**Parâmetros:**
- `id` (path) - ID do curso (integer)

**Exemplo com JavaScript:**
```javascript
const response = await fetch('https://av2-render.onrender.com/cursos/1', {
  method: 'DELETE'
});

if (response.ok) {
  console.log('Curso deletado com sucesso!');
}
```

---

##  Endpoints - ALUNOS

### 1. Listar Todos os Alunos
```http
GET /alunos/
```

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "matricula": "2024001",
    "curso": {
      "id": 1,
      "nome": "Engenharia de Software",
      "cargaHoraria": 3200
    }
  }
]
```

**Exemplo com JavaScript:**
```javascript
const response = await fetch('https://av2-render.onrender.com/alunos/');
const alunos = await response.json();
```

---

### 2. Buscar Aluno por ID
```http
GET /alunos/{id}
```

**Parâmetros:**
- `id` (path) - ID do aluno (integer)

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "matricula": "2024001",
  "curso": {
    "id": 1,
    "nome": "Engenharia de Software",
    "cargaHoraria": 3200
  }
}
```

---

### 3. Criar Novo Aluno
```http
POST /alunos/
```

**Body (JSON):**
```json
{
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "matricula": "2024002",
  "curso": {
    "id": 1
  }
}
```

**Resposta de Sucesso:**
```json
{
  "id": 2,
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "matricula": "2024002",
  "curso": {
    "id": 1,
    "nome": "Engenharia de Software",
    "cargaHoraria": 3200
  }
}
```

**Exemplo com JavaScript:**
```javascript
const novoAluno = {
  nome: "Maria Santos",
  email: "maria@example.com",
  matricula: "2024002",
  curso: {
    id: 1
  }
};

const response = await fetch('https://av2-render.onrender.com/alunos/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(novoAluno)
});

const alunoCriado = await response.json();
```

---

### 4. Atualizar Aluno
```http
PUT /alunos/{id}
```

**Parâmetros:**
- `id` (path) - ID do aluno (integer)

**Body (JSON):**
```json
{
  "nome": "Maria Santos Silva",
  "email": "maria.silva@example.com",
  "matricula": "2024002",
  "curso": {
    "id": 2
  }
}
```

**Exemplo com JavaScript:**
```javascript
const alunoAtualizado = {
  nome: "Maria Santos Silva",
  email: "maria.silva@example.com",
  matricula: "2024002",
  curso: {
    id: 2
  }
};

const response = await fetch('https://av2-render.onrender.com/alunos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(alunoAtualizado)
});
```

---

### 5. Deletar Aluno
```http
DELETE /alunos/{id}
```

**Parâmetros:**
- `id` (path) - ID do aluno (integer)

**Exemplo com JavaScript:**
```javascript
const response = await fetch('https://av2-render.onrender.com/alunos/1', {
  method: 'DELETE'
});

if (response.ok) {
  console.log('Aluno deletado com sucesso!');
}
```

---

##  Estrutura de Dados

### Curso
```javascript
{
  id: number,           // Gerado automaticamente
  nome: string,         // Obrigatório
  cargaHoraria: number  // Obrigatório (int32)
}
```

### Aluno
```javascript
{
  id: number,           // Gerado automaticamente
  nome: string,         // Obrigatório
  email: string,        // Obrigatório
  matricula: string,    // Obrigatório
  curso: {              // Obrigatório
    id: number,
    nome: string,
    cargaHoraria: number
  }
}
```

---

##  Tratamento de Erros

### Códigos de Status HTTP
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Recurso deletado com sucesso
- `400 Bad Request` - Dados inválidos
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

### Exemplo de Tratamento de Erros:
```javascript
try {
  const response = await fetch('https://av2-render.onrender.com/cursos/');
  
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  
  const cursos = await response.json();
  console.log(cursos);
  
} catch (error) {
  console.error('Erro ao buscar cursos:', error);
  alert('Erro ao carregar dados. Tente novamente.');
}
```

---

##  Funcionalidades do Sistema

### Interface Web
- ✅ Listagem de cursos em tabela
- ✅ Listagem de alunos em tabela
- ✅ Cadastro de novos cursos
- ✅ Cadastro de novos alunos
- ✅ Edição de cursos existentes
- ✅ Edição de alunos existentes
- ✅ Exclusão de cursos
- ✅ Exclusão de alunos
- ✅ Validação de formulários
- ✅ Feedback visual de ações
- ✅ Design responsivo

---

##  Exemplo de Uso Completo

```javascript
// 1. Criar um curso
const curso = await fetch('https://av2-render.onrender.com/cursos/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: "Análise e Desenvolvimento de Sistemas",
    cargaHoraria: 2400
  })
});
const cursoCriado = await curso.json();
console.log('Curso criado:', cursoCriado);

// 2. Criar um aluno vinculado ao curso
const aluno = await fetch('https://av2-render.onrender.com/alunos/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: "Pedro Oliveira",
    email: "pedro@example.com",
    matricula: "2024003",
    curso: { id: cursoCriado.id }
  })
});
const alunoCriado = await aluno.json();
console.log('Aluno criado:', alunoCriado);

// 3. Listar todos os alunos
const listaAlunos = await fetch('https://av2-render.onrender.com/alunos/');
const alunos = await listaAlunos.json();
console.log('Todos os alunos:', alunos);
```