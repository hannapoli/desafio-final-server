const express = require('express');
const cors = require('cors');
const path = require('path');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./configs/swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
// const frontendUrl = `${process.env.FRONT_URL}`;
const frontendLocalHost = `${process.env.FRONT_LOCALHOST}`;
const whitelist = [frontendLocalHost];
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

// ================================== MIDDLEWARES ==================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors(corsOptions));

// ========================== EJS para la página principal: ==========================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// ====================================== RUTAS ======================================
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.use('/api/v1/producer', require('./routes/producer.routes')); //Ruta para el panel de producer

// =============================== Iniciar el servidor ===============================
app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port}​`);
});