import { Request, Response, NextFunction } from "express";
import ProductRepository from "../database/repository/productRepository";
import CustomerRepository from "../database/repository/customer_repository";

export class ProductController {
    public static CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {
            name,
            desc,
            type,
            unit,
            price,
            available,
            suplier,
            banner,} = req.body
          const createProduct = await ProductRepository.CreateProduct(name,
            desc,
            type,
            unit,
            price,
            available,
            suplier,
            banner,)
          res.status(200).json({
            statusCode: 200,
            message: "Account created",
            data: {
              _id: createProduct._id,
              name: createProduct.name,
              price: createProduct.price
            },
          });
        } catch (e) {
          next(e);
        }
      }

      public static async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductRepository.GetProducts()
            res.json(products)
        }catch(e){
            console.log(e)
        }
    }

    public static async GetProductbyId(req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params
            
            const product = await ProductRepository.GetProductbyId(id)
            if (!product) {
              return res.status(404).json({ error: "Customer not found" });
            } else {
              res.json({product});
              console.log('')
              return
            }
          } catch (error) {
            res.status(500).json({ error });
          }
    }

    public static async GetProductbyCategory(req: Request, res: Response, next: NextFunction) {
        try {

            const {type} = req.params
            
            const product = await ProductRepository.GetProductbyId(type)
            if (!product) {
              return res.status(404).json({ error: "Customer not found" });
            } else {
              res.json({product});
              console.log('')
              return
            }
          } catch (error) {
            res.status(500).json({ error });
          }
    }

    public static async GetSelectedProducts(req: Request, res: Response, next: NextFunction) {
        try {

            const {ids} = req.body
            
            const product = await ProductRepository.FindSelectedProducts(ids)
            if (!product) {
              return res.status(404).json({ error: "Customer not found" });
            } else {
              res.json({product});
              console.log('')
              return
            }
          } catch (error) {
            res.status(500).json({ error });
          }
    }

    public static async Addwishlist(req: Request, res: Response, next: NextFunction) {
      try {

          const {id} = req.params
          const product = await ProductRepository.GetProductbyId(req.body.id)
          const wishlist = await CustomerRepository.AddWishlistItem(id, product)
          if (!wishlist) {
            return res.status(404).json({ error: "wishlist not found" });
          } else {
            res.json({product});
            console.log('')
            return
          }
        } catch (error) {
          res.status(500).json({ error });
        }
  }

      public static async DeleteProductbyId(req: Request, res: Response, next: NextFunction) {
       try {

        const {id} = req.params
        
        const product = await ProductRepository.GetProductbyId(req.body.id)
          const wishlist = await CustomerRepository.AddWishlistItem(id, product)
        if (!wishlist) {
          return res.status(404).json({ error: "delete not found" });
        } else {
          res.json({wishlist});
          console.log('')
          return
        }
      } catch (error) {
        res.status(500).json({ error });
      }
     }

     public static async ManageCart(req: Request, res: Response, next: NextFunction) {
      try {
  
          const {_id, qty} = req.body
          
          const product = await ProductRepository.GetProductbyId(_id)
            const wishlist = await CustomerRepository.AddCartItem(_id, product, qty, false)
          if (!wishlist) {
            return res.status(404).json({ error: "delete not found" });
          } else {
            res.json({wishlist});
            console.log('')
            return
          }
        } catch (error) {
          res.status(500).json({ error });
        }
  }



  
}