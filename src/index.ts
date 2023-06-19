import Express from "express"
import router from "./routes"
import AppDataSource from "./dataSource"
import cors from "cors"

const app = Express()

AppDataSource.initialize().then(() => {
  app.use(cors({ origin: "*" }))
  app.use(Express.json())
  app.use(Express.urlencoded({ extended: true }))
  app.use(router)

  app.listen(3000, () => {
    console.log(`🔥 Server is running on http://localhost:${3000}`)
  })
})
