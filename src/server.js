require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const routeOptimizerRoutes = require('./routes/routeOptimizerRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do Frontend (public/)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas da API REST
app.use('/api/v1', authRoutes);
app.use('/api/v1/deliveries', deliveryRoutes);
app.use('/api/v1/routes', routeOptimizerRoutes);

// Inicialização única do servidor
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 API e Plataforma UrbanLink Flow rodando em http://localhost:${PORT}`);
    });
}

module.exports = app;
