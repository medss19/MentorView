// backend/src/controllers/mentorController.js
const mentorService = require('../services/mentorService');

class MentorController {
  async getAllMentors(req, res, next) {
    try {
      const mentors = await mentorService.getAllMentors();
      res.json(mentors);
    } catch (error) {
      next(error);
    }
  }

  async getMentorById(req, res, next) {
    try {
      const { id } = req.params;
      const mentor = await mentorService.getMentorById(id);
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
      res.json(mentor);
    } catch (error) {
      next(error);
    }
  }

  async createMentor(req, res, next) {
    try {
      const mentor = await mentorService.createMentor(req.body);
      res.status(201).json(mentor);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MentorController();