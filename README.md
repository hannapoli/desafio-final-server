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
/tables.sql
```

#### 4️_ Arrancar el servidor

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


### Tecnologías
- Core: **Node.js, Express**
- DB & Storage: **PostgreSQL, Cloudinary**
- Security: **Firebase Admin SDK, CORS**
- Real-time: **Socket.io**
- Templates & Docs: **EJS, Swagger**



