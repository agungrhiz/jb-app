import transporter from "@/config/smtp";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class EmailService {
  private transporter = transporter;

  constructor(private from: string = process.env.SMTP_FROM || 'email@example.com') {}

  public async sendEmail(recipient: string, subject: string, content: string): Promise<void> {
    try {
      if (!this.from) {
        throw new Error('SMTP_FROM is not defined in the environment variables');
      }

      await this.transporter.sendMail({
        from: this.from,
        to: recipient,
        subject: subject,
        html: content,
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailService;