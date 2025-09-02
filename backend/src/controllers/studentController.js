// backend/src/controllers/studentController.js - Missing controller
const studentService = require('../services/studentService');

class StudentController {
  async getAllStudents(req, res, next) {
    try {
      const students = await studentService.getAllStudents();
      res.json(students);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableStudents(req, res, next) {
    try {
      const students = await studentService.getAvailableStudents();
      res.json(students);
    } catch (error) {
      next(error);
    }
  }

  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();