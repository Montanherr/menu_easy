const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.patch("/:id/availability", controller.toggleAvailability);

module.exports = router;
