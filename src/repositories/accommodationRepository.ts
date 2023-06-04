import AppDataSource from "@/dataSource"
import Accommodation from "@entity/accommodation"

const accommodationRepository = AppDataSource.getRepository(Accommodation)

export default accommodationRepository
