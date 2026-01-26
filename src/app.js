const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const { initSocket } = require("./socket");
const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./configs/swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = `${process.env.FRONT_URL}`;
const frontendLocalHost = `${process.env.FRONT_LOCALHOST}`;
const whitelist = [frontendLocalHost, frontendUrl];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.log('Origen no permitido por CORS:', origin);
            callback(new Error('Esta conexión no está permitida por CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
const swaggerDocument = require('../api-docs/swagger.json');

// ================================== MIDDLEWARES ==================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors(corsOptions));
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================== EJS para la página principal: ==========================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// ====================================== RUTAS ======================================
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.use('/api/v1/producer', require('./routes/producer.routes')); //Ruta para el panel de producer
app.use('/api/v1/director', require('./routes/director.routes')); //Ruta para el panel de director
app.use('/api/v1/analyst', require('./routes/analyst.routes')); //Ruta para el panel de analyst
app.use('/api/v1/consultant', require('./routes/consultant.routes')); //Ruta para el panel de analyst
app.use('/api/v1/admin', require('./routes/admin.routes')); //Ruta para el panel de admin
app.use('/api/v1', require('./routes/cloudinary.routes')); //Ruta para subir y eliminar imágenes en Cloudinary
app.use('/api/v1/messages', require('./routes/messages.routes')); //Ruta para el panel de mensaje

// =============================== Iniciar el servidor ===============================
const server = http.createServer(app);

/* ===== SOCKET.IO ===== */
initSocket(server, {
  origin: whitelist,
  methods: ["GET", "POST"],
  credentials: true
});

/* ===== LISTEN ===== */
server.listen(port, () => {
  console.log(`HTTP + Socket.IO en puerto ${port}`);
});

