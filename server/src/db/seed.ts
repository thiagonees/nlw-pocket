import { client, db } from ".";
import { goalCompletions, goals } from "./schema";
import dayjs from 'dayjs';



async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    { title: 'Acordar cedo', diseredWeeklyFrequency: 4 },
    { title: 'Fazer exercicios', diseredWeeklyFrequency: 3 },
    { title: 'Meditar', diseredWeeklyFrequency: 1 },
  ]).returning() 
  //retona os dados inseridos

    //startOfWeek comeca na posicao 0, domingo
  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt:  startOfWeek.add(2, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
  console.log('Seeding completed')
})