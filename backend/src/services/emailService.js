// backend/src/services/emailService.js - Missing email service
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEvaluationCompleteEmail(studentEmail, studentName) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: studentEmail,
        subject: 'Evaluation Completed',
        html: `
          <h2>Evaluation Complete</h2>
          <p>Dear ${studentName},</p>
          <p>Your semester project evaluation has been completed by your mentor.</p>
          <p>Results will be available soon through the college portal.</p>
          <br>
          <p>Best regards,<br>Academic Team</p>
        `,
      });
      console.log(`Email sent to ${studentEmail}`);
    } catch (error) {
      console.error('Email sending failed:', error);
      // Don't throw error - email failure shouldn't break the flow
    }
  }
}

module.exports = new EmailService();