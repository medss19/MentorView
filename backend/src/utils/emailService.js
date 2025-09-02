// backend/src/utils/emailService.js - Enhanced version
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  async initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Verify connection
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await this.transporter.verify();
        console.log('✅ Email service initialized');
      } else {
        console.log('⚠️  Email credentials not provided - email features disabled');
      }
    } catch (error) {
      console.error('❌ Email service initialization failed:', error.message);
    }
  }

  async sendEvaluationCompleteEmail(studentEmail, studentName, mentorName) {
    if (!this.transporter) {
      console.log('Email service not available');
      return;
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: studentEmail,
        subject: 'Evaluation Completed - Results Available',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Evaluation Completed</h2>
            <p>Dear ${studentName},</p>
            <p>Your semester project evaluation has been completed by your mentor <strong>${mentorName}</strong>.</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Results are now available in your student portal</li>
                <li>Contact your mentor if you have any questions</li>
                <li>Detailed feedback will be provided in the portal</li>
              </ul>
            </div>
            <p>Congratulations on completing your semester project!</p>
            <br>
            <p>Best regards,<br>
            <strong>Academic Evaluation Team</strong></p>
            <hr>
            <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Evaluation complete email sent to ${studentEmail}`);
    } catch (error) {
      console.error('❌ Email sending failed:', error);
    }
  }

  async sendBulkEvaluationEmails(assignments, mentorName) {
    const emailPromises = assignments.map(assignment =>
      this.sendEvaluationCompleteEmail(
        assignment.student.email,
        assignment.student.name,
        mentorName
      )
    );

    try {
      await Promise.all(emailPromises);
      console.log(`✅ Bulk emails sent to ${assignments.length} students`);
    } catch (error) {
      console.error('❌ Bulk email sending failed:', error);
    }
  }
}

module.exports = new EmailService();