const prisma = require("./database/adapter")

const express = require("express")

const app = express()
const PORT = 8080

// Conecta ao banco de dados
async function conectarBanco() {

    try {
        await prisma.$connect()
        console.log("Conectado ao banco de dados com sucesso!")

    } catch (error) {
        console.error(error)
        process.exit(1) // Encerra o programa
    }
}

// Inicia o servidor
async function iniciarServidor() {

    try {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`)
        })

    } catch (error) {
        console.error(error)
        process.exit(1) // Encerra o programa
    }
}

conectarBanco()
iniciarServidor()

// Utiliza JSON no Express
app.use(express.json())

// === Importando e definindo rotas ===

const tarefas_route = require("./routes/tarefas_route")
app.use("/tarefas", tarefas_route)