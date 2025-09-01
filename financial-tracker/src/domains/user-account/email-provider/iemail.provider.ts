export interface IEmailProvider {
  sendEmail(emailTo: string, subject: string, text: string): Promise<boolean>;
}
