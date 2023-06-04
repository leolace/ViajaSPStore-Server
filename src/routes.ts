import { Router } from "express"
import "express-async-errors"

const router = Router()

router.get("/", (req, res) => {
  res.send({ message: "Atualização!" })
})

export default router
