# Práctica Semana 14 - CRUD MongoDB + JWT + OAuth Google

API REST con autenticación JWT, CRUD de usuarios y login con Google OAuth.

## Requisitos

- Node.js v18+
- MongoDB (local o Atlas)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/IngAdancito/S14-TRABAJO-PR-CTICO-EXPERIMENTAL_4_DESARROLLO.git
cd S14-TRABAJO-PR-CTICO-EXPERIMENTAL_4_DESARROLLO

# Instalar dependencias
npm install
```

## Variables de entorno

Crear archivo `.env` en la raíz:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mi-app
JWT_SECRET=mi_secreto_super_seguro_2024
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
SESSION_SECRET=secreto_para_sesion_2024
```

## Ejecución

```bash
npm start
```

Servidor en `http://localhost:5000`

## Endpoints

### CRUD Usuarios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/usuarios` | No | Crear usuario |
| GET | `/api/usuarios` | Sí | Listar usuarios |
| GET | `/api/usuarios/:id` | Sí | Obtener usuario |
| PUT | `/api/usuarios/:id` | Sí | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Sí | Eliminar usuario |

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/login` | Login con email y password, devuelve JWT |
| GET | `/api/auth/google` | Login con Google OAuth |

## Despliegue

- **Backend**: Render — `https://s14-backend.onrender.com`
- **Frontend**: Vercel — configura el directorio `frontend/`
