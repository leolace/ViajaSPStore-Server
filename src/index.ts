import Express from "express"
import router from "./routes"
import AppDataSource from "./dataSource"

const app = Express()

AppDataSource.initialize().then(() => {
  app.use(Express.json())
  // app.use(express.urlencoded({ extended: true }))
  app.use(router)

  app.listen(3000, () => {
    console.log(`🔥 Server is running on http://localhost:${3000}`)
  })
})
