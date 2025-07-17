import { Resend } from "resend";
import { IEmailProvider } from "./iemail.provider";

export type EmailProviderOptions = {
    emailFrom: string,
    emailApiToken: string,
}

export class EmailProvider implements IEmailProvider {

    private readonly emailService: Resend
    constructor(private readonly emailOptions: EmailProviderOptions) {
        this.emailService = new Resend(emailOptions.emailApiToken)
    }

    async sendEmail(emailTo: string, subject: string, text: string) {
        const response = await this.emailService.emails.send({
            from: this.emailOptions.emailFrom,
            to: emailTo,
            subject: subject,
            html: text
        })
        return response.data?.id !== undefined
    }
}