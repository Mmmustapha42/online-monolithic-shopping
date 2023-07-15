import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { UserAuth } from "../utils/middlewares/authMiddleware";

const router = Router()
router.get('/product', ProductController.getProducts)
router.get('/category/:type', ProductController.GetProductbyCategory)
router.get('/products/:id', ProductController.GetProductbyId)
router.post('/product/create', ProductController.CreateProduct)
router.post('/products/ids', ProductController.GetSelectedProducts)
router.put('/product/wishlist', ProductController.Addwishlist)

export default router;