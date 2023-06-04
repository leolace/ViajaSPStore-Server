import AppDataSource from "@/dataSource"
import City from "@entity/city"

const cityRepository = AppDataSource.getRepository(City)

export default cityRepository
