const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabaseState() {
  try {
    console.log('=== CURRENT DATABASE STATE ===');
    
    const mentors = await prisma.mentor.findMany();
    console.log('\n📋 Mentors:', mentors.length);
    mentors.forEach(m => console.log(`  - ${m.name} (${m.id})`));
    
    const students = await prisma.student.findMany();
    console.log('\n👥 Students:', students.length);
    students.forEach(s => console.log(`  - ${s.name} (${s.rollNo})`));
    
    const assignments = await prisma.assignment.findMany({
      include: { student: true, mentor: true }
    });
    console.log('\n📝 Assignments:', assignments.length);
    assignments.forEach(a => console.log(`  - ${a.student.name} assigned to ${a.mentor.name} (Locked: ${a.isLocked})`));
    
    const unassignedStudents = await prisma.student.findMany({
      where: { assignment: null }
    });
    console.log('\n🆓 Unassigned Students:', unassignedStudents.length);
    unassignedStudents.forEach(s => console.log(`  - ${s.name} (${s.rollNo})`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseState();
