const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('=== Cleaning Database ===');
    
    // Delete all assignments first
    await prisma.assignment.deleteMany();
    console.log('✅ All assignments deleted');
    
    // Reset all marks
    await prisma.mark.deleteMany();
    console.log('✅ All marks deleted');
    
    console.log('Database cleaned successfully');
    
  } catch (error) {
    console.error('Clean error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();
