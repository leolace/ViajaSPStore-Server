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

    const city = await cityRepository.findOne({
      where: { id },
      relations: ["categories", "tripPackages"]
    })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    return res.json(city)
  }

  async store(req: Request, res: Response) {
    const { name, state, attractions, about, categories_id, imagesUrl } =
      req.body

    const categories = await categoryRepository.find({
      where: { id: Any(categories_id) }
    })

    const city = cityRepository.create({
      name,
      state,
      attractions,
      about,
      categories,
      images: imagesUrl.length > 0 ? imagesUrl : []
    })

    await cityRepository.save(city)

    return res.json(city)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, state, attractions, about, categories_id, imagesUrl } =
      req.body

    const categories = await categoryRepository.find({
      where: { id: Any(categories_id) }
    })

    const city = await cityRepository.findOne({
      where: { id },
      relations: ["categories", "tripPackages"]
    })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    const data = {
      ...city,
      name: name || city.name,
      state: state || city.state,
      attractions: attractions || city.attractions,
      about: about || city.about,
      categories: categories.length > 0 ? categories : city.categories,
      images: imagesUrl.length > 0 ? imagesUrl : city.images
    }

    const updatedCity = await cityRepository.preload({ ...data, id })

    if (!updatedCity)
      return res.status(404).json({ error: "Cidade não encontrada" })

    cityRepository.save(updatedCity)

    return res.json(updatedCity)
  }
}

export default new CityController()
