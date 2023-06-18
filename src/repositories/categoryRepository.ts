import AppDataSource from "@/dataSource"
import Category from "../entities/category"

const categoryRepository = AppDataSource.getRepository(Category)

export default categoryRepository
