const prisma = require("../database/adapter")

async function criar(tarefa) {

    return await prisma.tarefa.create({
        data: {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            concluida: tarefa.concluida,
            usuarioId: tarefa.usuarioId
        }
    })
}

async function buscarTodos(usuarioId) {

    return await prisma.tarefa.findMany({
        where: {
            usuarioId: usuarioId
        }
    })
}

async function buscarPorId(tarefaId, usuarioId) {

    return await prisma.tarefa.findUnique({
        where: {
            id: tarefaId,
        },
    })
}

async function atualizarPorId(tarefaId, dadosFiltrados) {

    return await prisma.tarefa.update({
        where: { id: tarefaId },
        data: dadosFiltrados
    })
}

async function deletarPorId(tarefaId) {
    
    return await prisma.tarefa.delete({
        where: { id: tarefaId }
    })
}

module.exports = { criar, buscarTodos, buscarPorId, atualizarPorId, deletarPorId }