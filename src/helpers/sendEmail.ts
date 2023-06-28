import { Request } from "express"
import { createTransport } from "nodemailer"

export async function sendEmail(
  to: string,
  url: string,
  token: string,
  customerId: string
) {
  const html = `
  <div style="padding-bottom: 2rem;">
    <h1 style="background-color: #014AAD; color: #fff; width: auto; text-align: center; padding: 0.5rem 1rem; font-size: 2.5rem; border-radius: 0.5rem;">ViajaSP</h1>
    <h2>Clique no botão abaixo para confirmar seu e-mail</h2>
    <a style="padding: 0.5rem 1rem; background-color: #F8BC00; color: #014AAD; border-radius: 0.5rem; text-decoration: none; font-weight: 600; margin-top: 2rem;"  href="${url}/auth?userId=${customerId}&token=${token}">CONFIRMAR E-MAIL</a>
  </div>
    `

  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "lgonsalez02@gmail.com",
        pass: "tlab gsfp dwrl ygzj"
      }
    })

    await transporter.sendMail({
      from: "lgonsalez02@gmail.com",
      to,
      subject: "Confirmação de Email - ViajaSP",
      html
    })
  } catch (error) {
    console.log(error)
  }
}

export default sendEmail
