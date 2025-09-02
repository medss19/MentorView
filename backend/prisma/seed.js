// prisma/seed.js - Database seeding
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create evaluation parameters
  const parameters = await Promise.all([
    prisma.evaluationParameter.upsert({
      where: { name: 'Ideation' },
      update: {},
      create: { name: 'Ideation', maxMarks: 10, description: 'Quality of project ideas' }
    }),
    prisma.evaluationParameter.upsert({
      where: { name: 'Execution' },
      update: {},
      create: { name: 'Execution', maxMarks: 10, description: 'Implementation quality' }
    }),
    prisma.evaluationParameter.upsert({
      where: { name: 'Viva/Pitch' },
      update: {},
      create: { name: 'Viva/Pitch', maxMarks: 10, description: 'Presentation skills' }
    }),
    prisma.evaluationParameter.upsert({
      where: { name: 'Documentation' },
      update: {},
      create: { name: 'Documentation', maxMarks: 10, description: 'Project documentation' }
    })
  ]);

  // Create mentors
  const mentor = await prisma.mentor.upsert({
    where: { email: 'dr.smith@college.edu' },
    update: {},
    create: {
      name: 'Dr. Smith',
      email: 'dr.smith@college.edu'
    }
  });

  // Create students
  const students = await Promise.all([
    prisma.student.upsert({
      where: { email: 'alice@student.edu' },
      update: {},
      create: { name: 'Alice Johnson', email: 'alice@student.edu', rollNo: 'CS001' }
    }),
    prisma.student.upsert({
      where: { email: 'bob@student.edu' },
      update: {},
      create: { name: 'Bob Wilson', email: 'bob@student.edu', rollNo: 'CS002' }
    }),
    prisma.student.upsert({
      where: { email: 'charlie@student.edu' },
      update: {},
      create: { name: 'Charlie Brown', email: 'charlie@student.edu', rollNo: 'CS003' }
    }),
    prisma.student.upsert({
      where: { email: 'diana@student.edu' },
      update: {},
      create: { name: 'Diana Prince', email: 'diana@student.edu', rollNo: 'CS004' }
    }),
    prisma.student.upsert({
      where: { email: 'eve@student.edu' },
      update: {},
      create: { name: 'Eve Adams', email: 'eve@student.edu', rollNo: 'CS005' }
    })
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });