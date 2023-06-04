import AppDataSource from "@/dataSource"
import Customer from "@entity/customer"

const customerRepository = AppDataSource.getRepository(Customer)

export default customerRepository
