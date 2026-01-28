# AgroSync - Aplicación Agrícola
## AgroSync 🚜 Backend 

Este repositorio contiene el **backend de AgroSync**, una solución integral para la gestión técnica de campos agrícolas. La plataforma centraliza:
- Mapas interactivos y visualización 360º.
- Reportes técnicos automatizados.
- Comunicación en tiempo real entre productores, directores y analistas.

El sistema está diseñado bajo una arquitectura de Separación de Responsabilidades y utiliza servicios de primer nivel para la gestión de archivos y autenticación.

### Requisitos previos
Antes de comenzar, asegúrate de tener instalado:
- Node.js (v18+) & npm
- PostgreSQL (Base de datos relacional)
- Cuenta activa en Firebase (Auth) y Cloudinary (Imágenes)

### Instalación y arranque rápido
#### 1️º - Clonar y preparar entorno
```language
git clone https://github.com/hannapoli/desafio-final-server
cd desafio-final-server
npm install
```

#### 2️º - Configurar variables de entorno
Renombra .env.template a .env y completa las credenciales:

```language
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/agrosync
FIREBASE_SERVICE_ACCOUNT=... # Json de Firebase
CLOUDINARY_CLOUD_NAME=...
```
#####  ... (ver sección de variables más abajo)

#### 3️º - Inicializar Base de Datos
Ejecuta el script SQL incluido para crear la estructura de tablas:
```language
# Usa tu herramienta SQL preferida (pgAdmin, DBeaver) para ejecutar:
tables.sql
# Opción A: Desde terminal
psql -U tu_usuario -d agrosync -f tables.sql

# Opción B: Copia el contenido de 'tables.sql' en tu gestor (pgAdmin, DBeaver)
```

#### 4️º - Arrancar el servidor

```language
npm run dev
```
####  API y Documentación activa en:
```language
http://localhost:4000 |  http://localhost:4000/api-docs (Swagger)
```


### Arquitectura del Proyecto
El código se organiza siguiendo el patrón MVC (Model-View-Controller) para asegurar mantenibilidad:
- configs/: Configuración de servicios externos (Firebase, Cloudinary).
- controllers/: Lógica de control y gestión de respuestas HTTP.
- models/: Definición de esquemas y consultas a la base de datos (PG).
- middlewares/: Validación con Express-validator y protección de rutas.
- helpers/: Funciones de utilidad y lógica reutilizable.
- socket.js: Gestión de eventos en tiempo real para el chat integrado.
- 
## Roles y Permisos

La aplicación gestiona distintos roles con accesos diferenciados.  
Algunos endpoints son compartidos, pero el comportamiento interno varía según el rol autenticado.
##### PRODUCER
- Gestión completa de sus propias parcelas
- Creación y eliminación de recursos propios
- Acceso a chat y reportes asociados

###### ANALYST
- Acceso global de lectura a parcelas
- Generación y consulta de reportes técnicos
- No puede modificar parcelas

###### DIRECTOR
- Acceso de supervisión
- Visualización de dashboards globales
- Validación y control de reportes

###### CONSULTANT
- Acceso limitado de lectura
- Consulta de parcelas asignadas
- Comunicación vía chat


### Funcionalidades Principales
- 🔐 Autenticación: Integración con Firebase Auth para login seguro.
- 🗺️ Gestión de Parcelas: CRUD completo y visualización de datos de cultivo.
- 📸 Multimedia 360º: Almacenamiento y gestión de imágenes vía Cloudinary.
- 📄 Reportes Automáticos: Generación de PDF técnicos mediante PDFKit.
- 💬 Chat en Vivo: Comunicación bidireccional mediante Socket.io.
- 🔔 Alarmas: Sistema de alertas críticas sobre el estado de los cultivos.

### Endpoints Principales (Resumen)
Registro de nuevos usuarios
- POST  - (/register)

Datos generales según rol:
- GET - /dashboard/:id
  
Generación de reporte PDF:
- POST - /reports/create

Subida de imágenes a Cloudinary:
- POST - /upload

Recuperar historial de mensajes:
- GET - /getChat/:email

###  Detalle de las Variables de Entorno (.env)

Para que el backend funcione correctamente, debes configurar las siguientes claves en tu archivo `.env`. Puedes obtenerlas en sus respectivas plataformas:

| Variable | Descripción | Origen |
| :--- | :--- | :--- |
| `PORT` | Puerto local donde se ejecutará el servidor. | Definido por el usuario (ej. 4000) |
| `DATABASE_URL` | String de conexión: `postgresql://usuario:password@host:puerto/nombre_db` | [PostgreSQL Local](https://www.postgresql.org) o servicio en la nube |
| `FIREBASE_SERVICE_ACCOUNT` | El contenido completo (minificado) del JSON de tu cuenta de servicio. | [Firebase Console](https://console.firebase.google.com) > Configuración > Cuentas de servicio |
| `CLOUDINARY_CLOUD_NAME` | Nombre de tu "Cloud" en el panel principal. | [Cloudinary Dashboard](https://cloudinary.com) |
| `CLOUDINARY_API_KEY` | Clave de API para autenticar subidas. | [Cloudinary Dashboard](https://cloudinary.com) |
| `CLOUDINARY_API_SECRET` | Firma secreta (no compartir). | [Cloudinary Dashboard](https://cloudinary.com) |

> **Nota:** Asegúrate de que el archivo `.env` esté incluido en tu `.gitignore` para no exponer credenciales sensibles en el repositorio público.


### Detalle de las Variables de Env (.env)
**Variable** ----------------- **Descripción** ------------------------------------------- **Origen**
PORT ------------------------- Puerto local donde se ejecutará el servidor.	-------------- 4000
DATABASE_URL ----------------- String de conexión a PostgreSQL.	-------------------------- Postgres Local
FIREBASE_SERVICE_ACCOUNT ----- Contenido del JSON de tu cuenta de servicio (en una línea). Firebase Console
CLOUDINARY_CLOUD_NAME -------- Nombre de tu nube en el dashboard. ------------------------ Cloudinary
CLOUDINARY_API_KEY ----------- Clave de API para autenticación.	-------------------------- Cloudinary
CLOUDINARY_API_SECRET -------- Firma secreta de API. ------------------------------------- Cloudinary

⚠️ **Importante:** Para la variable FIREBASE_SERVICE_ACCOUNT, utiliza una versión "minificada" del JSON (sin saltos de línea) para evitar errores de lectura.



### Tecnologías
- Core: **Node.js, Express**
- DB & Storage: **PostgreSQL, Cloudinary**
- Security: **Firebase Admin SDK, CORS**
- Real-time: **Socket.io**
- Templates & Docs: **EJS, Swagger**
