const express = require("express")
const router = express.Router()

const tarefaController = require("../controllers/tarefas_controller")
const authMiddleware = require("../middlewares/auth_middleware")

// CREATE: Criar tarefa
router.post("/", tarefaController.create)

// READ: Listar todas as tarefas
router.get("/", tarefaController.getAll)

// READ: Listar tarefa por id
router.get("/:id", tarefaController.getById)

// UPDATE: Atualizar informações de uma tarefa por id
router.patch("/:id", tarefaController.update)

// DELETE: deletar uma tarefa po id
router.delete("/:id", tarefaController.remove)

module.exports = router