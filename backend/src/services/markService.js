// backend/src/services/markService.js - Missing marks service
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MarkService {
  async updateMarks(assignmentId, marksData) {
    // marksData = [{ parameterId: 'id1', marksObtained: 8 }, ...]
    
    const marks = [];
    for (const markData of marksData) {
      const mark = await prisma.mark.upsert({
        where: {
          assignmentId_parameterId: {
            assignmentId,
            parameterId: markData.parameterId
          }
        },
        update: {
          marksObtained: markData.marksObtained
        },
        create: {
          assignmentId,
          parameterId: markData.parameterId,
          marksObtained: markData.marksObtained
        },
        include: {
          parameter: true
        }
      });
      marks.push(mark);
    }
    
    return marks;
  }

  async getAssignmentMarks(assignmentId) {
    return await prisma.mark.findMany({
      where: { assignmentId },
      include: {
        parameter: true
      }
    });
  }
}

module.exports = new MarkService();