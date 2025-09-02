// backend/src/services/mentorService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MentorService {
  async getAllMentors() {
    return await prisma.mentor.findMany({
      include: {
        assignments: {
          include: {
            student: true,
            marks: {
              include: {
                parameter: true
              }
            }
          }
        }
      }
    });
  }

  async getMentorById(id) {
    return await prisma.mentor.findUnique({
      where: { id },
      include: {
        assignments: {
          include: {
            student: true,
            marks: {
              include: {
                parameter: true
              }
            }
          }
        }
      }
    });
  }

  async createMentor(data) {
    return await prisma.mentor.create({
      data
    });
  }
}

module.exports = new MentorService();