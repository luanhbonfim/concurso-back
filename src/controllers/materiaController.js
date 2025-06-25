const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /materias
const getMaterias = async (req, res) => {
  try {
    const materias = await prisma.materia.findMany({
      orderBy: { dataInicio: "desc" },
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar matérias" });
  }
};

// POST /materias
const createMateria = async (req, res) => {
  const { titulo, descricao } = req.body;
  try {
    const novaMateria = await prisma.materia.create({
      data: {
        titulo,
        descricao,
      },
    });
    res.status(201).json(novaMateria);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar matéria" });
  }
};

// GET /materias/:id
const getMateriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const materia = await prisma.materia.findUnique({
      where: { id: parseInt(id) },
    });
    if (!materia) {
      return res.status(404).json({ error: "Matéria não encontrada" });
    }
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar matéria" });
  }
};

// PUT /materias/:id
const updateMateria = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  try {
    const materiaAtualizada = await prisma.materia.update({
      where: { id: parseInt(id) },
      data: { titulo, descricao },
    });
    res.json(materiaAtualizada);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar matéria" });
  }
};

// DELETE /materias/:id
const deleteMateria = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.materia.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar matéria" });
  }
};

module.exports = {
  getMaterias,
  createMateria,
  getMateriaById,
  updateMateria,
  deleteMateria,
};
