import AppDataSource from "@/dataSource"
import TripPackage from "@entity/tripPackage"

const tripPackageRepository = AppDataSource.getRepository(TripPackage)

export default tripPackageRepository
