// Rotas
import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import { prisma } from './lib/prisma';
import { z } from 'zod';

export async function appRoutes(app: FastifyInstance) {

  // ------------- Inserindo um hábito -------------
  app.post('/habits', async (req, res) => {
    // Validando dados de entrada e trazendo a tipagem para o TS.
    const createHabitBody = z.object({
      title: z.string(), //Titulo do tipo string e obrigatorio
      weekDays: z.array(z.number().min(0).max(6)) // weekDays do tipo array de numeros, de 0 a 6 e obrigatorio
    });
    
    const { title, weekDays} = createHabitBody.parse(req.body);

    // trabalhando a data de criação do habito
    const today = dayjs().startOf('day').toDate(); // zerando a hora da criação

    await prisma.habit.create({
      data : {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
    })
  })

  // ------------- Consultando os hábitos de um dia -------------
  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date() // transformando o parametro no formato date para ser usado.
    })

    const { date } = getDayParams.parse(req.query);

    //Pegando o dia da semana
    const parseDate = dayjs(date).startOf('day');
    const weekDay = parseDate.get('day');

    // Os habitos possiveis.
    // habitos que ja foram completados.

    const possibleHabits = await prisma.habit.findMany({
      where: {
        // Habitos onde a data de criação é menor que a data atual
        created_at: {
          lte: date,
        },
        // Criando o join automaticamente no where para verificar o dia da semana
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      // Verificando se a tada atual esta "incluida" na data de algum habito concluido
      include: {
        dayHabits: true,
      }
    })

    const completeHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id;
    })

    return {
      possibleHabits,
      completeHabits,
    }
  });
}
