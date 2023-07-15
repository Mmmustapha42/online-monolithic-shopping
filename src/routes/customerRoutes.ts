import { Router } from "express";
import {UserController} from "../controllers/customerController";
import { UserAuth } from "../utils/middlewares/authMiddleware";

const router = Router()

router.get("/customers", UserAuth, UserController.getCustomers)
router.get("/address", UserAuth, UserController.getAddress)
router.post("/customers", UserController.createUser)
router.post("/customers-address", UserAuth, UserController.createAddress)
router.post("/sign-in", UserController.loginUser)
router.get("/:id", UserAuth, UserController.getCustomer)
router.get("/customer/wishlist/:id", UserAuth, UserController.GetWISHList)



export default router;