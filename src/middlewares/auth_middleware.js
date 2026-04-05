const jwt = require("jsonwebtoken")
require("dotenv").config();

// Middleware para autenticar token JWT
function authToken(req, res, next) {

    const authHeader = req.headers["authorization"]

    // Ignora prefixo no header
    const token = authHeader?.split(" ")[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(401)
        req.user = user
        next()
    })
}

module.exports = { authToken }