import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

// Criando aplicação
const app = Fastify();

// Liberando a aplicação para acesso do back-end
app.register(cors);

// Conexão com BD
const prisma = new PrismaClient()

/*
  Metodos HTTP: Get, Post, Put, Patch, Delete
*/

// Criando a rota
app.get('/', async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'teste'
      }
    }
  })

  return habits
})

app.listen({
  port:3333
}).then(() => console.log('HTTP Server running.'));