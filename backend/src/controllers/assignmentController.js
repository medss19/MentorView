// backend/src/controllers/assignmentController.js
const assignmentService = require('../services/assignmentService');

class AssignmentController {
  // Get assignments for a mentor
  async getMentorAssignments(req, res, next) {
    try {
      const { mentorId } = req.params;
      const assignments = await assignmentService.getMentorAssignments(mentorId);
      res.json(assignments);
    } catch (error) {
      next(error);
    }
  }

  // Assign student to mentor
  async assignStudent(req, res, next) {
    try {
      const { mentorId, studentId } = req.body;
      const assignment = await assignmentService.assignStudent(mentorId, studentId);
      res.status(201).json(assignment);
    } catch (error) {
      next(error);
    }
  }

  // Remove student assignment
  async removeAssignment(req, res, next) {
    try {
      const { assignmentId } = req.params;
      await assignmentService.removeAssignment(assignmentId);
      res.json({ message: 'Assignment removed successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Submit/Lock assignments
  async submitAssignments(req, res, next) {
    try {
      const { mentorId } = req.params;
      const result = await assignmentService.submitAssignments(mentorId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // Get filtered assignments (with/without marks)
  async getFilteredAssignments(req, res, next) {
    try {
      const { mentorId } = req.params;
      const { filter } = req.query; // 'marked' or 'unmarked'
      const assignments = await assignmentService.getFilteredAssignments(mentorId, filter);
      res.json(assignments);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssignmentController();