import categoryRepository from "@/repositories/categoryRepository"
import cityRepository from "@/repositories/cityRepository"
import { Request, Response } from "express"
import { Any } from "typeorm"

class CityController {
  async index(req: Request, res: Response) {
    const cities = await cityRepository.find()

    return res.json(cities)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const city = await cityRepository.findOne({ where: { id } })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    return res.json(city)
  }

  async store(req: Request, res: Response) {
    const { name, state, attractions, about, categories_id } = req.body

    const categories = await categoryRepository.find({
      where: { id: Any(categories_id) }
    })

    const city = cityRepository.create({
      name,
      state,
      attractions,
      about,
      categories
    })

    await cityRepository.save(city)

    return res.json(city)
  }
}

export default new CityController()
