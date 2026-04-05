const tarefaRepository = require("../repositories/tarefas_repository")

async function criarTarefa(body) {

    return await tarefaRepository.criar(body)
}

async function listarTarefas() {

    const todasTarefas = await tarefaRepository.buscarTodos()

    if (todasTarefas.length === 0) {
        throw new Error("Nenhuma tarefa para listar")
    }

    return todasTarefas
}

async function buscarTarefaPorId(tarefaId) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id inválido")
        erro.code = "ID_INVALIDO"
        throw erro
    }

    const tarefa = await tarefaRepository.buscarPorId(tarefaId)

    if (tarefa === null) {
        
        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"
        throw erro
    }

    return tarefa
}

async function atualizarTarefaPorId(tarefaId, body) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id inválido")
        erro.code = "ID_INVALIDO"
        throw erro
    }

    const tarefaExiste = await tarefaRepository.buscarPorId(tarefaId)

    if (tarefaExiste === null) {

        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"
        throw erro
    }

    // Filtragem de campos da requisição
    data = {}
    
    if (body.titulo !== undefined) data.titulo = body.titulo
    if (body.descricao !== undefined) data.descricao = body.descricao
    if (body.concluida !== undefined) data.concluida = body.concluida

    if (Object.keys(data).length === 0) {
        const erro = new Error("Nenhum campo válido para atualizar")
        erro.code = "CAMPOS_INVALIDOS"
        throw erro
    }
    
    const tarefa = await tarefaRepository.atualizarPorId(tarefaId, data)

    return tarefa
}

async function deletarTarefa(tarefaId) {

    if (isNaN(tarefaId)) {
        const erro = new Error("Id inválido")
        erro.code = "ID_INVALIDO"
        throw erro
    }

    const tarefaExiste = await tarefaRepository.buscarPorId(tarefaId)

    if (tarefaExiste === null) {

        const erro = new Error("Tarefa não encontrada")
        erro.code = "TAREFA_NAO_EXISTE"
        throw erro
    }

    const tarefa = await tarefaRepository.deletarPorId(tarefaId)

    return tarefa
}

module.exports = { criarTarefa, listarTarefas, buscarTarefaPorId, atualizarTarefaPorId, deletarTarefa}