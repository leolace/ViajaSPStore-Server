import sendEmail from "@/helpers/sendEmail"
import authRepository from "@/repositories/authRepository"
import customerRepository from "@/repositories/customerRepository"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

class CustomerController {
  async index(req: Request, res: Response) {
    const { email } = req.query

    let customers

    if (email) {
      customers = await customerRepository.find({
        where: { email: String(email) }
      })
    } else {
      customers = await customerRepository.find()
    }

    res.json(customers)
  }

  async store(req: Request, res: Response) {
    const { name, email, password, cpf } = req.body

    const customerExists = await customerRepository.findOne({
      where: [{ email }, { cpf }]
    })

    if (customerExists) {
      return res.status(409).json({ error: "Usuário já cadastrado" })
    }

    const customer = customerRepository.create({
      name,
      email,
      password,
      cpf
    })

    await customerRepository.save(customer)

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    const auth = authRepository.create({
      userId: customer.id,
      token
    })

    await authRepository.save(auth)

    const fullUrl = req.protocol + "://" + req.get("host")

    await sendEmail(customer.email, fullUrl, token, customer.id)

    return res.status(201).json({ token })
  }
}

export default new CustomerController()
