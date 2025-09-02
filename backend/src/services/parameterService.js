// backend/src/services/parameterService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ParameterService {
  async getAllParameters() {
    return await prisma.evaluationParameter.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async createParameter(data) {
    return await prisma.evaluationParameter.create({
      data
    });
  }

  async updateParameter(id, data) {
    return await prisma.evaluationParameter.update({
      where: { id },
      data
    });
  }

  async deleteParameter(id) {
    return await prisma.evaluationParameter.delete({
      where: { id }
    });
  }
}

module.exports = new ParameterService();