const express = require('express');
const router = express.Router();

// Importar rotas separadas
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const tableRoutes = require('./tableRoutes');
const companyUserRoutes = require('./companyUser');

// Registrar as rotas
router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tables', tableRoutes);
router.use('/company-user', companyUserRoutes);

// Exporte o conjunto de rotas
module.exports = router;
