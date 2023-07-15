import { APIError, STATUS_CODES } from "../../utils/app_errors";
import { Product } from "../models";

export default class ProductRepository {
    public static async CreateProduct(name: string, desc:string, type:string, unit:number, price:number, available: boolean, suplier:string, banner:string,) {
        try {
              const createUser = await Product.create({
                name,
                desc,
                type,
                unit,
                price,
                available,
                suplier,
                banner,
                })
                const productResult = await createUser.save()
                return productResult;

          } catch (err) {
              console.log(err)
              throw new APIError(
                  "API error",
                  STATUS_CODES.INTERNAL_ERROR,
                  "Unable to create customer",
                  false,
                  "Check your connections",
                  "Retry"
              )
          }  
      }

      public static async GetProducts() {
        const allProduct = await Product.find({})
        if(!allProduct) throw Error('Error fetching products')
        return allProduct;
      }

      public static async GetProductbyId(id: string) {
        const customer = await Product.findById(id, { hash: 0 })
        if(!customer) throw Error('Error fetching product')
        return customer;
      }

      public static async GetProductDescription(id: string) {
        const customer = await Product.findById(id, { hash: 0 })
        if(!customer) throw Error('Error fetching product')
        return customer;
      }

      public static async FindByCategory(category:string) {
        try {
          const products = await Product.find({ type: category });
          return products;
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Category",
            false,
            "Check your connections",
            "Retry"
          );
        }
      }

      public static async FindSelectedProducts(selectedIds:Array<string>) {
        try {
          const products = await Product.find()
            .where("_id")
            .in(selectedIds.map((_id) => _id))
            .exec();
          return products;
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Product",
            false,
            "Check your connections",
            "Retry"
          );
        }
      }
}