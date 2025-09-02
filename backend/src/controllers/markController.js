// backend/src/controllers/markController.js - Missing controller
const markService = require('../services/markService');

class MarkController {
  async updateMarks(req, res, next) {
    try {
      const { assignmentId, marks } = req.body;
      const updatedMarks = await markService.updateMarks(assignmentId, marks);
      res.json(updatedMarks);
    } catch (error) {
      next(error);
    }
  }

  async getAssignmentMarks(req, res, next) {
    try {
      const { assignmentId } = req.params;
      const marks = await markService.getAssignmentMarks(assignmentId);
      res.json(marks);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MarkController();