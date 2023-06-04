import express from "express"
import router from "./routes"
import AppDataSource from "./dataSource"

const app = express()

AppDataSource.initialize().then(() => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(router)

  app.listen(3000, () => {
    console.log(`🔥 Server is running on http://localhost:${3001}`)
  })
})
