const express = require("express");
const router = express.Router();

const tableController = require("../controllers/tableController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// LIST ALL TABLES (restricted to logged users)
router.get("/", auth, tableController.index);

// GET ONE TABLE
router.get("/:id", auth, tableController.show);

// CREATE TABLE (ONLY ADMIN)
router.post("/", auth, admin, tableController.store);

// UPDATE TABLE (ONLY ADMIN)
router.put("/:id", auth, admin, tableController.update);

// DELETE TABLE (ONLY ADMIN)
router.delete("/:id", auth, admin, tableController.delete);

module.exports = router;
