import categoryRepository from "@/repositories/categoryRepository"
import { Request, Response } from "express"

class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await categoryRepository.find()

    return res.json(categories)
  }

  async store(req: Request, res: Response) {
    const { name } = req.body

    const category = categoryRepository.create({ name })

    await categoryRepository.save(category)

    return res.json(category)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const category = await categoryRepository.findOne({
      where: { id },
      relations: ["cities", "tripPackages"]
    })

    return res.json(category)
  }
}

export default new CategoryController()
