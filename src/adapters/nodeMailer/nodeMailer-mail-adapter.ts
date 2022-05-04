import { MailAdapter, SendMailData } from "../mail-adapters";
import nodemailer  from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5968e2fea24c2c",
    pass: "348db3cd6ba94b"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com>',
            to: 'leonardo <leonardomartinha.dev@gmail.com>',
            subject,
            html: body
        })  
    }
}