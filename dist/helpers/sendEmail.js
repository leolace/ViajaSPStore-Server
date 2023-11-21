"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
async function sendEmail(to, url, token, customerId) {
    const html = `
  <div style="padding-bottom: 2rem;">
    <h1 style="background-color: #014AAD; color: #fff; width: auto; text-align: center; padding: 0.5rem 1rem; font-size: 2.5rem; border-radius: 0.5rem;">ViajaSP</h1>
    <h2>Clique no botão abaixo para confirmar seu e-mail</h2>
    <a style="padding: 0.5rem 1rem; background-color: #F8BC00; color: #014AAD; border-radius: 0.5rem; text-decoration: none; font-weight: 600; margin-top: 2rem;"  href="${url}/auth?userId=${customerId}&token=${token}">CONFIRMAR E-MAIL</a>
  </div>
    `;
    try {
        const transporter = (0, nodemailer_1.createTransport)({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Confirmação de Email - ViajaSP",
            html
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.sendEmail = sendEmail;
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map