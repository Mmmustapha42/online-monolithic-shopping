import CustomerRepository from "../database/repository/customer_repository";
import { Request, Response, NextFunction } from "express";

export class UserController {
    public static customerService = new CustomerRepository();
  
    public static createUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {name, password, email} = req.body
        const createUser = await this.customerService.createCustomer(name, password, email)
        res.status(200).json({
          statusCode: 200,
          message: "Account created",
          data: {
            _id: createUser._id,
            email: createUser.email,
          },
        });
      } catch (e) {
        next(e);
      }
    }

    public static async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const customers = await this.customerService.GetCustomers()
            res.json(customers)
        }catch(e){
            console.log(e)
        }
    }
}