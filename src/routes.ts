import { Router } from "express"
import "express-async-errors"
import customerController from "./controllers/customerController"
import authController from "./controllers/authController"

const router = Router()

// AUTH
router.post("/auth", authController.auth)
router.get("/auth", authController.me)
router.get("/auth/:id/:token", authController.verify)

// CUSTOMER
router.get("/customer", customerController.index)
router.post("/customer", customerController.store)

export default router
