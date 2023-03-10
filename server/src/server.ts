import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './route';

// Criando aplicação
const app = Fastify();

// Liberando a aplicação para acesso do back-end
app.register(cors);
app.register(appRoutes);

//! configuração para tratar network erro no axios
app.listen({
  port:3333,
  host:'0.0.0.0',
}).then(() => console.log('HTTP Server running on port 3333.'));
