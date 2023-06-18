import accommodationRepository from "@/repositories/accommodationRepository"
import categoryRepository from "@/repositories/categoryRepository"
import cityRepository from "@/repositories/cityRepository"
import tripPackageRepository from "@/repositories/tripPackageRepository"
import { Request, Response } from "express"
import { Any } from "typeorm"

class TripPackageController {
  async index(req: Request, res: Response) {
    const tripPackages = await tripPackageRepository.find({
      relations: ["city", "categories"]
    })

    return res.json(tripPackages)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const tripPackage = await tripPackageRepository.findOne({
      where: { id },
      relations: ["city", "categories", "accommodation"]
    })

    if (!tripPackage) {
      return res.status(404).json({ error: "Pacote não encontrado" })
    }

    return res.json(tripPackage)
  }

  async store(req: Request, res: Response) {
    const {
      price,
      categories_id,
      city_id,
      transport,
      departureDate,
      returnDate,
      accommodation_id
    } = req.body

    const categories = await categoryRepository.find({
      where: { id: Any(categories_id) }
    })

    const city = await cityRepository.findOne({ where: { id: city_id } })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    const accommodation = await accommodationRepository.findOne({
      where: { id: accommodation_id }
    })

    if (!accommodation) {
      return res.status(404).json({ error: "Acomodação não encontrada" })
    }

    const tripPackage = tripPackageRepository.create({
      city,
      price,
      categories,
      transport,
      accommodation,
      returnDate,
      departureDate
    })

    await tripPackageRepository.save(tripPackage)

    return res.json(tripPackage)
  }
}

export default new TripPackageController()
