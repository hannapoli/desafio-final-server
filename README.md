# AGROSYNC BACKEND - API DE GESTIÓN DE PARCELAS DE CULTIVO

Este repositorio backend (server) proporciona servicios para la gestión de campos agrícolas, con mapas interactivos, generación de reportes, visualizador de imágenes en 360º, generación de reportes, comunicación a través de un chat integrado entre los diferentes usuarios, gestión de alarmas y autenticación de usuarios mediante Firebase. Expone una API REST segura consumida desde el frontend (cliente) de AgroSync.

## INSTALACIÓN
1. Clona este repositorio
```bash
git clone https://github.com/hannapoli/desafio-final-server
```
2. Ejecuta los siguientes comandos
```bash
npm install
npm run dev
```
3. En tu herramienta de base de datos SQL crea el proyecto y ejecuta las queries del archivo tables.sql
4. Crea un un proyecto nuevo en Firebase.
5. Crea un usuario en Cloudinary.
6. Renombra el archivo llamado .env.template por .env y completa las variables de entorno.

## CARACTERÍSTICAS PRINCIPALES
- Autenticación mediante Firebase
- Protección de rutas
- Gestión de parcelas
- Gestión de reportes
- Gestión de mensajes
- Gestión de alertas
- Gestión de imágenes 360

## TECNOLOGÍAS UTILIZADAS
- Node.js + Express
- Cloudinary
- CORS
- Dotenv
- EJS
- Express-validator
- Firebase
- Multer
- PG
- Socket.io
- Swagger

## VARIABLES DE ENTORNO
```bash
PORT=
DATABASE_URL= Base de datos en local
DATABASE_URL= Base de datos desplegada
FIREBASE_SERVICE_ACCOUNT=
FRONT_URL=
FRONT_LOCALHOST=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV='production'
NODE_ENV='development'
```

## ESTRUCTURA DEL PROYECTO
```bash
src/
    configs/
    controllers/
    helpers/
    middlewares/
    models/
    public/
        uploads/
    routes/
    views/
    app.js
    socket.js
.env.template
package-lock.json
package.json
README.md
tables.sql
```

## ENDPOINTS PRINCIPALES
### AUTHENTICATION
```bash
POST /register
GET /me
```
### PRODUCER
```bash
GET /dashboard/:id
GET /parcel/:id
```
### DIRECTOR
```bash
GET dashboard/:id
GET parcel/:id
```
### ANALYST
```bash
GET dashboard/:id
GET parcel/:id
```
### REPORTS
```bash
GET reports/getAll/:email
GET reports/getByID/:idReport
POST reports/create/:email/:idParcel
PUT /reports/update/:idReport
DELETE reports/delete/:idReport
```
### CONSULTANT
```bash
GET /dashboard/:email
GET /parcel/:id
```
### CLOUDINARY
```bash
POST /upload
DELETE /delete
```
### MESSAGES
```bash
GET /getChat/:email
GET /getAll/:email_creator/:email_receiver
GET /getByID/:idMessage
POST /create/:email_creator/:email_receiver
DELETE /delete/:idMessage
DELETE deleteAll/:email
```