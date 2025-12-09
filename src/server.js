require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

// Função para conectar com retry
async function connectWithRetry() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await sequelize.sync();
    console.log('📦 Models synchronized');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Database not ready, retrying in 5 seconds...');
    console.error(error.message);
    setTimeout(connectWithRetry, 5000);
  }
}

// Start
connectWithRetry();
