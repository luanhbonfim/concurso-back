const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /estudos
const getEstudos = async (req, res) => {
  try {
    const estudos = await prisma.estudo.findMany({
      include: { materia: true, revisoes: true },
      orderBy: { dataEstudo: "desc" },
    });
    res.json(estudos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estudos" });
  }
};

// POST /estudos
const createEstudo = async (req, res) => {
  const { materiaId, notas, duracaoMin } = req.body;
  try {
    const novoEstudo = await prisma.estudo.create({
      data: {
        materiaId,
        notas,
        duracaoMin,
      },
      include: { materia: true },
    });

    // Gerar revisões automáticas (1 dia, 7 dias, 30 dias)
    const hoje = new Date();
    const revisoes = [1, 3, 7, 30].map((dias) => ({
    estudoId: novoEstudo.id,
    dataRevisao: new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000),
    }));

    await prisma.revisao.createMany({ data: revisoes });

    res.status(201).json(novoEstudo);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar estudo" });
  }
};

// GET /estudos/:id
const getEstudoById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudo = await prisma.estudo.findUnique({
      where: { id: parseInt(id) },
      include: { materia: true, revisoes: true },
    });
    if (!estudo) return res.status(404).json({ error: "Estudo não encontrado" });
    res.json(estudo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estudo" });
  }
};

// DELETE /estudos/:id
const deleteEstudo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.revisao.deleteMany({ where: { estudoId: parseInt(id) } });
    await prisma.estudo.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar estudo" });
  }
};

module.exports = {
  getEstudos,
  createEstudo,
  getEstudoById,
  deleteEstudo,
};
