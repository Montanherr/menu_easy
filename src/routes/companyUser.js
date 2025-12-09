const express = require("express");
const router = express.Router();
const controller = require("../controllers/companyUserController");

router.post("/", controller.createCompanyAndUser);

module.exports = router;
