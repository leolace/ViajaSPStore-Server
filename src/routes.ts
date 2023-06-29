import { Router } from "express"
import "express-async-errors"
import customerController from "@/controllers/customer.controller"
import authController from "@/controllers/auth.controller"
import categoryController from "./controllers/category.controller"
import cityController from "./controllers/city.controller"
import accommodationController from "./controllers/accommodation.controller"
import tripPackageController from "./controllers/tripPackage.controller"

const router = Router()

// AUTH
router.post("/auth", authController.auth)
router.get("/auth", authController.me)
router.get("/auth/verify", authController.verify)
router.post("/auth/verify", authController.sendVerifyEmail)

// CUSTOMER
router.get("/customer", customerController.index)
router.post("/customer", customerController.store)

// CATEGORY
router.get("/category", categoryController.index)
router.get("/category/:id", categoryController.show)
router.post("/category", categoryController.store)

// CITY
router.get("/city", cityController.index)
router.get("/city/:id", cityController.show)
router.post("/city", cityController.store)
router.put("/city/:id", cityController.update)

// ACCOMMODATION
router.get("/accommodation", accommodationController.index)
router.get("/accommodation/:id", accommodationController.show)
router.post("/accommodation", accommodationController.store)

// TRIP PACKAGE

router.get("/trip-package", tripPackageController.index)
router.get("/trip-package/:id", tripPackageController.show)
router.post("/trip-package", tripPackageController.store)

export default router
