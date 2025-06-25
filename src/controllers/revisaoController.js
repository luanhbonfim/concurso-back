const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /revisoes
const getRevisoes = async (req, res) => {
  try {
    const revisoes = await prisma.revisao.findMany({
      include: { estudo: { include: { materia: true } } },
      orderBy: { dataRevisao: "asc" },
    });
    res.json(revisoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar revisões" });
  }
};

// PATCH /revisoes/:id/marcar
const marcarComoRevisada = async (req, res) => {
  const { id } = req.params;
  const { revisada } = req.body; // true ou false

  try {
    const revisao = await prisma.revisao.update({
      where: { id: parseInt(id) },
      data: { revisada: Boolean(revisada) },
    });
    res.json(revisao);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar revisão" });
  }
};

module.exports = {
  getRevisoes,
  marcarComoRevisada,
};
