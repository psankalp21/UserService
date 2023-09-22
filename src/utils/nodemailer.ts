import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { appConfig } from '../common/appconfig';

class EmailSender {
  private transporter: Transporter;

  constructor() {
    const email = appConfig.env.EMAIL_USER;
    const pass = appConfig.env.EMAIL_PASSWORD;

    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: email,
        pass: pass,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions: SendMailOptions = {
        to: to,
        subject: subject,
        text: text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

export const emailSender = new EmailSender();

