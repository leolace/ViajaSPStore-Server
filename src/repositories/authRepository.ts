import AppDataSource from "@/dataSource"
import Auth from "@/entities/auth"

const authRepository = AppDataSource.getRepository(Auth)

export default authRepository
