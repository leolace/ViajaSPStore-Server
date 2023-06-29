import authRepository from "@/repositories/authRepository"
import customerRepository from "@/repositories/customerRepository"
import { Request, Response } from "express"
import path from "path"
import jwt from "jsonwebtoken"
import sendEmail from "@/helpers/sendEmail"

class AuthController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios para fazer login" })
    }

    const user = await customerRepository.findOne({ where: { email } })

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Email ou senha incorretos" })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    return res.json({ token })
  }

  async me(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: "Não autorizado" })
    }

    const [, token] = authorization.split(" ")

    jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
      if (err || !decoded || typeof decoded === "string" || !decoded.id) {
        return res.status(401).json({ error: "Não autorizado" })
      }

      const user = await customerRepository.findOneBy({ id: decoded.id })

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" })
      }

      return res.json(user)
    })
  }

  async sendVerifyEmail(req: Request, res: Response) {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório" })
    }

    const user = await customerRepository.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    if (user.verified) {
      return res.status(400).json({ error: "E-mail já verificado" })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    const auth = authRepository.create({
      userId: user.id,
      token
    })

    await authRepository.save(auth)

    const clientURL = process.env.CLIENT_URL as string

    await sendEmail(user.email, clientURL, token, user.id)

    return res.sendStatus(200)
  }

  async verify(req: Request, res: Response) {
    const { id, token } = req.query

    if (!id || !token) {
      return res.status(400).send("Dados insuficientes para verificar o email")
    }

    const customer = await customerRepository.findOneBy({ id: id as string })

    if (!customer) {
      return res
        .status(404)
        .send("Não foi possível encontrar o usuário para verificar o email")
    }

    if (customer.verified) {
      return res
        .status(404)
        .sendFile(path.join(__dirname + "/../../public/emailVerified.html"))
    }

    const auth = await authRepository.findOneBy({
      userId: id as string,
      token: token as string
    })

    if (!auth) {
      return res.status(404).send("Não foi possível verificar o email")
    }

    await customerRepository.update(customer.id, { verified: true })
    await authRepository.delete(auth.userId)

    return res.sendStatus(200)
  }
}

export default new AuthController()
