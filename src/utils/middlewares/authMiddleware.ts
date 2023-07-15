import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express";
import secret from '../../config/config'
import { Customer } from "../../database/models";


export const UserAuth = async (req: Request, res: Response, next: NextFunction) => {
    
        try {
            if(req.headers.authorization?.startsWith('Bearer')) {
                let token = req.headers.authorization.slice(7)
                jwt.verify(token, secret.appSecret, (err, decode)=>{
                    if(err){
                        res.json({err: 'invalid credentials'})
                    } else {
                        console.log(token)
                        next()
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
    };