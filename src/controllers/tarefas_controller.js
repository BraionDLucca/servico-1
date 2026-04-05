const tarefaService = require("../services/tarefas_service")

// TODO: Coletar id do usuário logado para associar à nova tarefa.
// Usando mock por enquanto.
const idUsuarioLogado = 1

async function create(req, res) {

    try {

        const tarefa = {
            "titulo": req.body.titulo,
            "descricao": req.body.descricao,
            "concluida": false,
            "usuarioId": idUsuarioLogado // req.user.id
        }

        // Recebe o resultado do service
        const resultado = await tarefaService.criarTarefa(tarefa)

        res.status(201).json({ "mensagem": "sucesso", "resultado": resultado })

    } catch (erro) {
        console.error(erro)

        return res.status(500).json({ "mensagem": "erro interno", "resultado": null })
    }
}

async function getAll(req, res) {

    try {
        const todasTarefas = await tarefaService.listarTarefas()
        res.status(200).json({ "mensagem": "sucesso", "resultado": todasTarefas })

    } catch (erro) {
        console.error(erro)

        if (erro.code === "TAREFA_NAO_EXISTE") {
            return res.status(404).json({ "mensagem": erro.message, "resultado": null })
        }

        return res.status(500).json({ "mensagem": "erro interno", "resultado": null })
    }
}

async function getById(req, res) {

    try {

        const tarefaId = parseInt(req.params.id)

        const tarefa = await tarefaService.buscarTarefaPorId(tarefaId)

        res.status(200).json({ "mensagem": "sucesso", "resultado": tarefa })

    } catch (erro) {

        console.error(erro)

        if (erro.code === "TAREFA_NAO_EXISTE") {
            return res.status(404).json({ "mensagem": erro.message, "resultado": null })
        }

        if (erro.code === "ID_INVALIDO") {
            return res.status(400).json({ "mensagem": erro.message, "resultado": null })
        }

        return res.status(500).json({ "mensagem": "Erro interno", "resultado": null })
    }
}

async function update(req, res) {

    try {

        const tarefaId = parseInt(req.params.id)

        const tarefa = await tarefaService.atualizarTarefaPorId(tarefaId, req.body)

        res.status(200).json({ "mensagem": "sucesso", "resultado": tarefa })

    } catch (erro) {

        console.error(erro)

        if (erro.code === "TAREFA_NAO_EXISTE") {
            return res.status(404).json({ "mensagem": erro.message, "resultado": null })
        }

        if (erro.code === "ID_INVALIDO") {
            return res.status(400).json({ "mensagem": erro.message, "resultado": null })
        }

        if (erro.code === "CAMPOS_INVALIDOS") {
            return res.status(400).json({ "mensagem": erro.message, "resultado": null })
        }

        return res.status(500).json({ "mensagem": "Erro interno", "resultado": null })
    }
}

async function remove(req, res) {

    try {

        const tarefaId = parseInt(req.params.id)

        const tarefa = await tarefaService.deletarTarefa(tarefaId)

        res.status(200).json({ "mensagem": "sucesso", "resultado": tarefa })

    } catch (erro) {

        console.error(erro)

        if (erro.code === "TAREFA_NAO_EXISTE") {
            return res.status(404).json({ "mensagem": erro.message, "resultado": null })
        }

        if (erro.code === "ID_INVALIDO") {
            return res.status(400).json({ "mensagem": erro.message, "resultado": null })
        }

        return res.status(500).json({ "mensagem": "Erro interno", "resultado": null })
    }
}

module.exports = { create, getAll, getById, update, remove }