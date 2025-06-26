# API Documentation - Corelab Task Manager

## Base URL

```
http://localhost:3000/api
```

## Authentication

Atualmente, a API não requer autenticação. Em futuras versões, será implementado sistema de autenticação com JWT.

## Endpoints

### Tasks

#### GET /tasks

Retorna todas as tarefas do usuário.

**Query Parameters:**

- `filter` (opcional): `favorites` - Filtra apenas tarefas favoritas
- `color` (opcional): Filtra por cor específica

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Exemplo de tarefa",
      "description": "Descrição da tarefa",
      "color": "#6366f1",
      "isFavorite": false,
      "completed": false,
      "createdAt": "2025-06-26T10:00:00.000Z",
      "updatedAt": "2025-06-26T10:00:00.000Z"
    }
  ]
}
```

#### POST /tasks

Cria uma nova tarefa.

**Request Body:**

```json
{
  "title": "Título da tarefa", // obrigatório, max 100 chars
  "description": "Descrição", // opcional, max 500 chars
  "color": "#6366f1" // opcional, default: "#6366f1"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Título da tarefa",
    "description": "Descrição",
    "color": "#6366f1",
    "isFavorite": false,
    "completed": false,
    "createdAt": "2025-06-26T10:00:00.000Z",
    "updatedAt": "2025-06-26T10:00:00.000Z"
  }
}
```

#### GET /tasks/:id

Retorna uma tarefa específica por ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Título da tarefa",
    "description": "Descrição",
    "color": "#6366f1",
    "isFavorite": false,
    "completed": false,
    "createdAt": "2025-06-26T10:00:00.000Z",
    "updatedAt": "2025-06-26T10:00:00.000Z"
  }
}
```

#### PUT /tasks/:id

Atualiza uma tarefa existente.

**Request Body:**

```json
{
  "title": "Novo título", // opcional
  "description": "Nova descrição", // opcional
  "color": "#ec4899", // opcional
  "isFavorite": true, // opcional
  "completed": true // opcional
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Novo título",
    "description": "Nova descrição",
    "color": "#ec4899",
    "isFavorite": true,
    "completed": true,
    "createdAt": "2025-06-26T10:00:00.000Z",
    "updatedAt": "2025-06-26T10:30:00.000Z"
  }
}
```

#### DELETE /tasks/:id

Remove uma tarefa.

**Response:**

```json
{
  "success": true,
  "data": {}
}
```

## Error Responses

### 400 - Bad Request

```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 404 - Not Found

```json
{
  "success": false,
  "error": "Task not found"
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Data Models

### Task

```javascript
{
  _id: ObjectId,           // MongoDB ID único
  title: String,           // Título da tarefa (obrigatório, max 100 chars)
  description: String,     // Descrição opcional (max 500 chars)
  color: String,          // Cor da tarefa (enum de 8 cores)
  isFavorite: Boolean,    // Se é favorita (default: false)
  completed: Boolean,     // Se está concluída (default: false)
  createdAt: Date,        // Data de criação (automático)
  updatedAt: Date         // Data da última atualização (automático)
}
```

### Cores Disponíveis

- `#6366f1` - Azul (default)
- `#ec4899` - Rosa
- `#10b981` - Verde
- `#f59e0b` - Amarelo
- `#ef4444` - Vermelho
- `#8b5cf6` - Roxo
- `#06b6d4` - Ciano
- `#84cc16` - Lima

## Rate Limiting

Atualmente não há rate limiting implementado. Em produção, recomenda-se implementar rate limiting para prevenir abuso da API.

## Versioning

Esta é a versão 1.0 da API. Futuras versões serão versionadas através do path (`/api/v2/tasks`).

## Examples

### Criar uma tarefa favorita

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar React",
    "description": "Revisar hooks e context API",
    "color": "#10b981",
    "isFavorite": true
  }'
```

### Buscar tarefas favoritas

```bash
curl "http://localhost:3000/api/tasks?filter=favorites"
```

### Buscar tarefas por cor

```bash
curl "http://localhost:3000/api/tasks?color=%2310b981"
```

### Atualizar tarefa

```bash
curl -X PUT http://localhost:3000/api/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Deletar tarefa

```bash
curl -X DELETE http://localhost:3000/api/tasks/507f1f77bcf86cd799439011
```
