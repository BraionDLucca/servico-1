require("dotenv").config();
const { PrismaClient } = require("../../generated/prisma");

const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

// Adaptador para conectar Prisma ao MySQL
const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
});

// Instanciação do PrismaClient para usar seus métodos na API
const prisma = new PrismaClient({ adapter })

module.exports = prisma