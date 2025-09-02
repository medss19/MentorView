// backend/src/controllers/parameterController.js
const parameterService = require('../services/parameterService');

class ParameterController {
  async getAllParameters(req, res, next) {
    try {
      const parameters = await parameterService.getAllParameters();
      res.json(parameters);
    } catch (error) {
      next(error);
    }
  }

  async createParameter(req, res, next) {
    try {
      const parameter = await parameterService.createParameter(req.body);
      res.status(201).json(parameter);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ParameterController();