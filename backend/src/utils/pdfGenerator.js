// backend/src/utils/pdfGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  async generateMarksheet(mentorData, assignments) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const filename = `marksheet_${mentorData.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        const filepath = path.join(__dirname, '../../temp', filename);

        // Ensure temp directory exists
        const tempDir = path.dirname(filepath);
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }

        doc.pipe(fs.createWriteStream(filepath));

        // Header
        doc.fontSize(20).text('Student Evaluation Marksheet', 50, 50);
        doc.fontSize(14).text(`Mentor: ${mentorData.name}`, 50, 80);
        doc.fontSize(12).text(`Generated on: ${new Date().toDateString()}`, 50, 100);

        let yPosition = 140;

        assignments.forEach((assignment, index) => {
          // Student Info
          doc.fontSize(14).text(`${index + 1}. ${assignment.student.name} (${assignment.student.rollNo})`, 50, yPosition);
          yPosition += 25;

          // Marks Table
          doc.fontSize(10);
          doc.text('Parameter', 70, yPosition);
          doc.text('Marks', 200, yPosition);
          doc.text('Max Marks', 260, yPosition);
          yPosition += 20;

          let totalMarks = 0;
          let maxTotal = 0;

          assignment.marks.forEach(mark => {
            doc.text(mark.parameter.name, 70, yPosition);
            doc.text(mark.marksObtained.toString(), 200, yPosition);
            doc.text(mark.parameter.maxMarks.toString(), 260, yPosition);
            
            totalMarks += mark.marksObtained;
            maxTotal += mark.parameter.maxMarks;
            yPosition += 15;
          });

          // Total
          doc.fontSize(12);
          doc.text(`Total: ${totalMarks}/${maxTotal}`, 70, yPosition + 10);
          doc.text(`Percentage: ${((totalMarks/maxTotal) * 100).toFixed(1)}%`, 200, yPosition + 10);
          
          yPosition += 50;

          // Page break if needed
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }
        });

        doc.end();

        doc.on('end', () => {
          resolve(filepath);
        });

      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new PDFGenerator();