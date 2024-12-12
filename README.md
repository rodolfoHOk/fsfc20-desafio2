# Imersão FullStack & FullCycle 20 - Desafio 1

> Criando API de chat no Next.js

## Descrição do desafio

Neste desafio, você deve criar uma aplicação Next.js com Docker que rode na porta 3000.

Esta aplicação precisa expor 2 rotas de API Rest:

- Criar chat - POST /api/chats

- Listar chats - GET /api/chats

Um chat guarda duas informações:

- ID é auto-incrementado
- mensagem que é String.

O Next.js precisa salvar e buscar os dados do banco de dados usando o Prisma ORM, o banco de dados a ser utilizado precisa ser o SQLite e precisa ser commitado no projeto.

Crie o arquivo api.http para declarar as 2 chamadas a serem realizadas.

## Tecnologias

- Typescript / Javascript
- Next.js
- Prisma ORM
- SQLite

## Como rodar

### Requisitos

- docker / docker compose

### Comando

- docker compose up --build
