// backend/reset-assignments.js - Reset assignments for fresh demo
const { PrismaClient } = require('@prisma/client');

async function resetAssignments() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Resetting assignments and evaluations...');
    
    // Step 1: Delete all marks (evaluations)
    const deletedMarks = await prisma.mark.deleteMany({});
    console.log(`✅ Deleted ${deletedMarks.count} evaluation marks`);
    
    // Step 2: Delete all assignments
    const deletedAssignments = await prisma.assignment.deleteMany({});
    console.log(`✅ Deleted ${deletedAssignments.count} assignments`);
    
    // Step 3: Show current state
    const mentors = await prisma.mentor.findMany({
      include: {
        assignments: {
          include: {
            student: true,
            marks: true
          }
        }
      }
    });
    
    console.log('\n📊 Current State:');
    mentors.forEach(mentor => {
      console.log(`👨‍🏫 ${mentor.name}: ${mentor.assignments.length} assignments`);
    });
    
    const availableStudents = await prisma.student.findMany({
      where: {
        assignment: {
          is: null
        }
      }
    });
    
    console.log(`\n👥 Available Students (unassigned): ${availableStudents.length}`);
    availableStudents.forEach(student => {
      console.log(`   - ${student.name} (${student.rollNo})`);
    });
    
    console.log('\n🎉 Reset complete! Ready for fresh demonstration.');
    console.log('💡 Now you can assign students fresh in your app.');
    
  } catch (error) {
    console.error('❌ Reset failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAssignments();
