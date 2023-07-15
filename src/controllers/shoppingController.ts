import { Request, Response, NextFunction, RequestHandler} from "express";

import { ShoppingRepository } from "../database/repository/shoppingRepository";

class ShoppingController {
    public static PlaceOrder: RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
        try{
            const {_id} = req.params;
            const { txnNumber } = req.body;
            const data  = await ShoppingRepository.CreateNewOrder(_id, txnNumber);
            return res.status(200).json(data);

        }catch(e){
            next(e)
        }
    }
}