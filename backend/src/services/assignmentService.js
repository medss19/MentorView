// backend/src/services/assignmentService.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AssignmentService {
  async getMentorAssignments(mentorId) {
    return await prisma.assignment.findMany({
      where: { mentorId },
      include: {
        mentor: true,
        student: true,
        marks: {
          include: {
            parameter: true
          }
        }
      }
    });
  }

  async assignStudent(mentorId, studentId) {
    // Validation: Check mentor capacity (3-4 students)
    const currentAssignments = await prisma.assignment.count({
      where: { mentorId }
    });

    if (currentAssignments >= 4) {
      throw new Error('Mentor can only accommodate maximum 4 students');
    }

    // Check if student is already assigned
    const existingAssignment = await prisma.assignment.findUnique({
      where: { studentId }
    });

    if (existingAssignment) {
      throw new Error('Student is already assigned to another mentor');
    }

    return await prisma.assignment.create({
      data: {
        mentorId,
        studentId
      },
      include: {
        student: true,
        mentor: true
      }
    });
  }

  async removeAssignment(assignmentId) {
    // Check if assignment is locked
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId }
    });

    if (assignment?.isLocked) {
      throw new Error('Cannot remove assignment - marks are already submitted');
    }

    return await prisma.assignment.delete({
      where: { id: assignmentId }
    });
  }

  async submitAssignments(mentorId) {
    // Check minimum 3 students requirement
    const assignments = await this.getMentorAssignments(mentorId);
    
    if (assignments.length < 3) {
      throw new Error('Minimum 3 students must be assigned before submission');
    }

    // Check if all students have complete marks
    const parameters = await prisma.evaluationParameter.findMany();

    for (const assignment of assignments) {
      if (assignment.marks.length !== parameters.length) {
        throw new Error(`Student ${assignment.student.name} has incomplete marks`);
      }
    }

    // Lock all assignments
    await prisma.assignment.updateMany({
      where: { mentorId },
      data: { isLocked: true }
    });

    // Send email notifications (console log approach for demo)
    console.log('\n📧 =============== EMAIL NOTIFICATIONS ===============');
    for (const assignment of assignments) {
      console.log(`📧 Email sent to: ${assignment.student.name} (${assignment.student.email})`);
      console.log(`   Subject: Evaluation Completed - MentorView System`);
      console.log(`   Content: Dear ${assignment.student.name}, your semester project evaluation has been completed.`);
      console.log(`   ✅ Email delivered successfully`);
      console.log('');
    }
    console.log('==================================================\n');

    return { message: 'Assignments submitted successfully' };
  }

  async getFilteredAssignments(mentorId, filter) {
    const parameters = await prisma.evaluationParameter.findMany();
    const assignments = await this.getMentorAssignments(mentorId);

    if (filter === 'marked') {
      return assignments.filter(a => a.marks.length === parameters.length);
    } else if (filter === 'unmarked') {
      return assignments.filter(a => a.marks.length < parameters.length);
    }

    return assignments;
  }
}

module.exports = new AssignmentService();