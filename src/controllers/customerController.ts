import CustomerRepository from "../database/repository/customer_repository";
import { Request, Response, NextFunction } from "express";
import secret from '../config/config'
import jwt from 'jsonwebtoken'

export class UserController {
    public static createUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {name, password, email, phone} = req.body
        const createUser = await CustomerRepository.createCustomer(name,  email, password, phone)
        res.status(200).json({
          statusCode: 200,
          message: "Account created",
          data: {
            _id: createUser._id,
            email: createUser.email,
            password: createUser.password
          },
        });
      } catch (e) {
        next(e);
      }
    }

    public static loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body
          const loginUser = await CustomerRepository.loginUser(email, password);
          if (!loginUser) throw new Error('Invalid Credentials')
          
          let token = jwt.sign(
            {
              id: loginUser._id,
            },
            secret.appSecret,
            { expiresIn: "3 Days"  }
          );
    
          res.status(200).json({
            statusCode: 200,
            message: "logged in",
            data: {
              token: token,
              _id: loginUser._id,
              email: loginUser.email,
            },
          });
        } catch (e) {
          next(e);
        }
      };



    public static async createAddress(req: Request, res: Response, next: NextFunction) {
        const {email, street, postalCode, city, country} = req.body
        try{
            const createAddress = await CustomerRepository.CreateAddress(email, street, postalCode,  city, country)
            return createAddress
        } catch (e) {
            console.log(e)
        }

    }

    public static async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const customers = await CustomerRepository.GetCustomers()
            res.json(customers)
        }catch(e){
            console.log(e)
        }
    }

    public static async getAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const customers = await CustomerRepository.GetAddess()
            res.json(customers)
        }catch(e){
            console.log(e)
        }
    }

    public static async getCustomer(req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params
            
            const customer = await CustomerRepository.GetCustomerbyId(id)
            if (!customer) {
              res.status(404).json({ error: "Customer not found" });
            } else {
              res.json({customer});
              console.log('')
            }
          } catch (error) {
            res.status(500).json({ error });
          }
    }

    public static async getShoppingDetails(req: Request, res: Response, next: NextFunction) {
      try {

          const {id} = req.params
          
          const customer = await CustomerRepository.GetCustomerbyId(id)
          if (!customer) {
            res.status(404).json({ error: "Customer not found" });
          } else {
            res.json({customer});
            console.log('')
          }
        } catch (error) {
          res.status(500).json({ error });
        }
  }

    public static async GetWISHList(req: Request, res: Response, next: NextFunction) {
      try {
        const {id} = req.params
        const data = await CustomerRepository.GetWishlist(id)
        res.json(data)
      }catch(e){
        console.log(e)
    } 

    
}

    
    

    

}