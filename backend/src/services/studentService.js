// backend/src/services/studentService.js - Missing student service
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StudentService {
  async getAllStudents() {
    return await prisma.student.findMany({
      include: {
        assignment: {
          include: {
            mentor: true
          }
        }
      }
    });
  }

  async getAvailableStudents() {
    return await prisma.student.findMany({
      where: {
        assignment: null // Students not assigned to any mentor
      }
    });
  }

  async createStudent(data) {
    return await prisma.student.create({
      data
    });
  }
}

module.exports = new StudentService();
