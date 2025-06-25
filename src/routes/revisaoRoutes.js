const express = require("express");
const router = express.Router();
const revisaoController = require("../controllers/revisaoController");

router.get("/", revisaoController.getRevisoes);
router.patch("/:id/marcar", revisaoController.marcarComoRevisada);

module.exports = router;
