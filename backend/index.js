const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.create({
  //   data: {
  //     pseudo: 'Alice3',
  //     token: '123456789',
  //     events: {
  //       create: {
  //         type: 'event',
  //       }
  //     }
  //   },
  // })

  const allUsers = await prisma.user.findMany({
    include: { events: true },
  })
  console.dir(allUsers, { depth: null })
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})