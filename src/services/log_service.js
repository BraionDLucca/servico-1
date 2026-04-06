async function enviarLog(logBody) {

    try {

        // Envio de informações para logs do Serviço 2
        const logData = await fetch("http://127.0.0.1:8081/api/logs", {
            method: "POST",
            body: JSON.stringify(logBody),
            headers: { "Content-Type": "application/json" }
        })

        const data = await logData.json()
        console.log(data)

    } catch (err) {
        console.error("Erro no fetch:", err)
    }

}

module.exports = { enviarLog }