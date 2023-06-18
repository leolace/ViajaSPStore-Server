import accommodationRepository from "@/repositories/accommodationRepository"
import cityRepository from "@/repositories/cityRepository"
import { Request, Response } from "express"

class AccommodationController {
  async index(req: Request, res: Response) {
    const accommodations = await accommodationRepository.find()

    return res.json(accommodations)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const accommodation = await accommodationRepository.findOne({
      where: { id }
    })

    if (!accommodation) {
      return res.status(404).json({ error: "Acomodação não encontrada" })
    }

    return res.json(accommodation)
  }

  async store(req: Request, res: Response) {
    const { name, city_id, rooms, stars } = req.body

    const city = await cityRepository.findOne({ where: { id: city_id } })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    const accommodation = accommodationRepository.create({
      name,
      city,
      rooms,
      stars
    })

    await accommodationRepository.save(accommodation)

    return res.json(accommodation)
  }
}

export default new AccommodationController()
