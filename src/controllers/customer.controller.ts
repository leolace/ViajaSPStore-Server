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
      customers = await customerRepository.findOne({
        where: { email: String(email) }
      })
    } else {
      customers = await customerRepository.find()
    }

    res.json(customers)
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body

    const customerExists = await customerRepository.findOne({
      where: { email }
    })

    if (customerExists) {
      return res.status(409).json({ error: "E-mail já cadastrado" })
    }

    const customer = customerRepository.create({
      name,
      email,
      password
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

    const clientURL = process.env.CLIENT_URL as string

    await sendEmail(customer.email, clientURL, token, customer.id)

    return res.status(201).json({ token })
  }
}

export default new CustomerController()
