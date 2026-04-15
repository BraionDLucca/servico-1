# Serviço 1 – API de Tarefas (CRUD + AUTH)
#### Aluno: Braion D'Lucca Silva Carvalho | Matrícula: 2321753

Este projeto faz parte de uma atividade prática de estudo de APIs RESTful utilizando ORMs e integração de diferentes linguagens backend a uma interface.


## Principais Tecnologias Utilizadas:
- <b>NodeJS v22.15.1:</b> Ambiente de execução JavaScript;
- <b>Express v5.2.1:</b> Framework para criação de API;
- <b>JWT (jasonwebtoken) v9.0.3:</b> Biblioteca para validação de tokens JWT;
- <b>Prisma v7.4.2:</b> ORM moderno para JavaScript/TypeScript;
- <b>MySQL Ver 8.0.41:</b> Banco de dados relacional.


## Funcionalidades Implementadas
✅ CRUD completo de tarefas; <br>
✅ Operações REST com ORM (Prisma); <br>
✅ Tratamento de erros; <br>
✅ Persistência de dados (MySQL). <br>
✅ Validação de token JWT. <br>

## Organização de Pastas

- `prisma`: Armazena esquemas (models) das entidades do banco de dados e `/migrations`;

- `src/controllers`: Responsável por interagir com as requisições HTTP;

- `src/services`: Responsável por validar regras de negócio e tratar erros;

- `src/repository`: Responsável pela manipulação de dados através do Prisma;

- `src/database`: Responsável pela conexão com o banco de dados MySQL, através do `adapter`;

- `src/routes`: Responsável pela definição das rotas da API;

- `src/middlewares`: Responsável por armazenar middlewares utilizados pelas rotas.

## Instalação

1. Clone este repositório:

    ```
    git clone https://github.com/BraionDLucca/servico-1
    ```
<br>

2. Acesse a pasta raiz do projeto com:

    ```
    cd servico-1
    ```
<br>

3. Instale as dependências necessárias com:

    ```
    npm install
    ```
<br>

4. Crie um schema MySQL vazio pelo MySQL Workbench ou MySQL Command Line Client.

    ```
    CREATE DATABASE nome_do_banco;
    ```
<br>

5. Crie um arquivo `.env` na raiz do projeto com a seguinte estrutura:

    ```
    DATABASE_URL="mysql://username:password@localhost:3306/mydb"

    DATABASE_USER="username"
    DATABASE_PASSWORD="password"
    DATABASE_NAME="mydb"
    DATABASE_HOST="localhost"
    DATABASE_PORT=3306
    ```
    Substitua os placeholders com suas credenciais (incluindo no URL de conexão com o banco):
    
    
    - `username`: Seu usuário MySQL;
    - `password`: Sua senha MySQL;
    - `mydb`: Nome do seu banco de dados;
    - `localhost`: Host do seu banco de dados;
    - `3306`: Porta do seu banco de dados.

<br>

6. Adicione suas credenciais JWT no arquivo `.env`:
    
    ```
    JWT_SECRET ="chave-secreta"
    ```

    Substitua o placeholder `chave-secreta` pela sua chave secreta;

<br>

7. Sincronize o `prisma/schema.prisma` com o banco para criar as tabelas:

    ```
    npx prisma db push
    ```
<br>

8. Gere o Prisma Client com:
    
    ```
    npx prisma generate
    ```

## Execução

- Execute o comando:

    ```
    npx run src/servidor.js
    ```
