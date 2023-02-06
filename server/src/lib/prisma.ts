// conexão bd

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  // logando as requisições http
  log: ['query']
})
