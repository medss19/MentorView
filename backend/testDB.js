const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('=== Testing Database ===');
    
    // Test mentor query
    const mentors = await prisma.mentor.findMany();
    console.log('Mentors:', mentors.length);
    
    // Test assignments for the mentor
    const mentorId = mentors[0]?.id;
    console.log('Using mentor ID:', mentorId);
    
    const assignments = await prisma.assignment.findMany({
      where: { mentorId },
      include: {
        student: true,
        marks: {
          include: {
            parameter: true
          }
        }
      }
    });
    
    console.log('Assignments found:', assignments.length);
    assignments.forEach(a => {
      console.log(`- ${a.student.name} (${a.student.rollNo}) - Marks: ${a.marks.length}`);
    });
    
    // Test available students
    const availableStudents = await prisma.student.findMany({
      where: {
        assignment: null
      }
    });
    
    console.log('Available students:', availableStudents.length);
    availableStudents.forEach(s => {
      console.log(`- ${s.name} (${s.rollNo})`);
    });
    
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
