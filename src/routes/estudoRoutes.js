const express = require("express");
const router = express.Router();
const estudoController = require("../controllers/estudoController");

router.get("/", estudoController.getEstudos);
router.post("/", estudoController.createEstudo);
router.get("/:id", estudoController.getEstudoById);
router.delete("/:id", estudoController.deleteEstudo);

module.exports = router;
