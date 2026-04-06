const tarefaRepository = require("../repositories/tarefas_repository")
const logService = require("./log_service")

async function criarTarefa(tarefa) {

    const res = await tarefaRepository.criar(tarefa)

    const logBody = {
        "acao": "criar_tarefa",
        "detalhe": `Tarefa "${tarefa.titulo}" criada com sucesso.`,
        "usuarioId": tarefa.usuarioId
    }

    logService.enviarLog(logBody)

    return res
}

async function listarTarefas(usuarioId) {

    const todasTarefas = await tarefaRepository.buscarTodos(usuarioId)

    if (todasTarefas.length === 0) {
        throw new Error("Nenhuma tarefa para listar")
    }

    const logBody = {
        "acao": "buscar_todas_tarefas",
        "detalhe": `Tarefas do usuário consultadas com sucesso.`,
        "usuarioId": usuarioId
    }

    logService.enviarLog(logBody)

    return todasTarefas
}

async function buscarTarefaPorId(tarefaId, usuarioId) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id informado para busca é inválido")
        erro.code = "ID_INVALIDO"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const tarefa = await tarefaRepository.buscarPorId(tarefaId, usuarioId)

    if (tarefa.usuarioId !== usuarioId) {

        const erro = new Error("Você não tem permissão para consultar esta tarefa.")
        erro.code = "CONSULTA_SEM_PERMISSAO"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    if (tarefa === null) {

        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const logBody = {
        "acao": "buscar_uma_tarefa",
        "detalhe": `Tarefa de id: ${tarefaId} consultada com sucesso.`,
        "usuarioId": usuarioId
    }

    logService.enviarLog(logBody)

    return tarefa
}

async function atualizarTarefaPorId(tarefaId, body, usuarioId) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id inválido")
        erro.code = "ID_INVALIDO"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const tarefaExiste = await tarefaRepository.buscarPorId(tarefaId)

    if (tarefaExiste === null) {

        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    // Filtragem de campos da requisição
    dadosFiltrados = {}

    if (body.titulo !== undefined) dadosFiltrados.titulo = body.titulo
    if (body.descricao !== undefined) dadosFiltrados.descricao = body.descricao
    if (body.concluida !== undefined) dadosFiltrados.concluida = body.concluida

    // Se data estiver vazio, nenhum campo válido foi recebido na requisição
    if (Object.keys(dadosFiltrados).length === 0) {
        const erro = new Error("Nenhum campo válido para atualizar")
        erro.code = "CAMPOS_INVALIDOS"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const tarefa = await tarefaRepository.atualizarPorId(tarefaId, dadosFiltrados)

    const logBody = {
        "acao": "atualizar_tarefa",
        "detalhe": `Tarefa de id: ${tarefaId} atualizada com sucesso.`,
        "usuarioId": usuarioId
    }

    logService.enviarLog(logBody)

    return tarefa
}

async function deletarTarefa(tarefaId, usuarioId) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id inválido")
        erro.code = "ID_INVALIDO"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const tarefaExiste = await tarefaRepository.buscarPorId(tarefaId)

    if (tarefaExiste === null) {

        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"

        const logBody = {
            "acao": erro.code,
            "detalhe": erro.message,
            "usuarioId": usuarioId
        }

        logService.enviarLog(logBody)

        throw erro
    }

    const tarefa = await tarefaRepository.deletarPorId(tarefaId)

    const logBody = {
        "acao": "deletar_tarefa",
        "detalhe": `Tarefa de id: ${tarefaId} deletada com sucesso.`,
        "usuarioId": usuarioId
    }

    logService.enviarLog(logBody)

    return tarefa
}

module.exports = { criarTarefa, listarTarefas, buscarTarefaPorId, atualizarTarefaPorId, deletarTarefa }