// backend/src/controllers/reportController.js
const assignmentService = require('../services/assignmentService');
const pdfGenerator = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');

class ReportController {
  async generateMarksheet(req, res, next) {
    try {
      const { mentorId } = req.params;
      
      // Get mentor and assignments
      const assignments = await assignmentService.getMentorAssignments(mentorId);
      
      if (assignments.length === 0) {
        return res.status(400).json({ 
          message: 'No assignments found for this mentor' 
        });
      }

      // Check if all assignments are submitted
      const allSubmitted = assignments.every(a => a.isLocked);
      if (!allSubmitted) {
        return res.status(400).json({
          message: 'Cannot generate marksheet - not all evaluations are submitted'
        });
      }

      const mentorData = assignments[0].mentor;
      
      // Generate PDF
      const filepath = await pdfGenerator.generateMarksheet(mentorData, assignments);
      
      // Send file
      res.download(filepath, (err) => {
        if (err) {
          console.error('File download error:', err);
        }
        
        // Clean up temp file after download
        setTimeout(() => {
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        }, 5000);
      });

    } catch (error) {
      next(error);
    }
  }

  async getEvaluationSummary(req, res, next) {
    try {
      const { mentorId } = req.params;
      const assignments = await assignmentService.getMentorAssignments(mentorId);
      
      const summary = {
        totalStudents: assignments.length,
        evaluatedStudents: assignments.filter(a => a.marks.length > 0).length,
        submittedEvaluations: assignments.filter(a => a.isLocked).length,
        averageMarks: 0,
        parameterWiseAverage: {}
      };

      // Calculate averages
      if (assignments.length > 0) {
        let totalMarksSum = 0;
        let studentCount = 0;
        const parameterTotals = {};

        assignments.forEach(assignment => {
          if (assignment.marks.length > 0) {
            studentCount++;
            let studentTotal = 0;
            
            assignment.marks.forEach(mark => {
              studentTotal += mark.marksObtained;
              
              if (!parameterTotals[mark.parameter.name]) {
                parameterTotals[mark.parameter.name] = {
                  total: 0,
                  count: 0,
                  maxMarks: mark.parameter.maxMarks
                };
              }
              
              parameterTotals[mark.parameter.name].total += mark.marksObtained;
              parameterTotals[mark.parameter.name].count++;
            });
            
            totalMarksSum += studentTotal;
          }
        });

        if (studentCount > 0) {
          summary.averageMarks = (totalMarksSum / studentCount).toFixed(2);
        }

        // Parameter-wise averages
        Object.keys(parameterTotals).forEach(param => {
          const data = parameterTotals[param];
          summary.parameterWiseAverage[param] = {
            average: (data.total / data.count).toFixed(2),
            maxMarks: data.maxMarks,
            percentage: ((data.total / data.count / data.maxMarks) * 100).toFixed(1)
          };
        });
      }

      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();