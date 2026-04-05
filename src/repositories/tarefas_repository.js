const prisma = require("../database/adapter")

async function criar(body) {

    return await prisma.tarefa.create({
        data: {
            titulo: body.titulo,
            descricao: body.descricao,
            concluida: body.concluida,
            usuarioId: body.usuarioId
        }
    })
}

async function buscarTodos() {

    return await prisma.tarefa.findMany()
}

async function buscarPorId(tarefaId) {

    return await prisma.tarefa.findUnique({
        where: { id: tarefaId },
    })
}

async function atualizarPorId(tarefaId, body) {

    return await prisma.tarefa.update({
        where: { id: tarefaId },
        data: {
            titulo: body.titulo,
            descricao: body.descricao
        }
    })
}

async function deletarPorId(tarefaId) {
    
    return await prisma.tarefa.delete({
        where: { id: tarefaId }
    })
}

module.exports = { criar, buscarTodos, buscarPorId, atualizarPorId, deletarPorId }