import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import secret from '../config/config'
import { NextFunction, Request, Response } from 'express';

export default class Duties {

   public async generateSalt() {   
    try {
        return await bcrypt.genSalt();;
    }catch(err){
      console.log(err);
      return err;
    }
    }

    public async generatePassword(password: string | Buffer, salt:string | number) {
        try{
            return await bcrypt.hash(password, salt)
        } catch (err){
            console.log(err)
        }
    }

    public async validatePassword(enteredpASSWORD: string | Buffer, savedPassword: string, salt: string | number) {
        return (await this.generatePassword(enteredpASSWORD, salt)) === savedPassword
    }

    public static async generateSignature(payload:string | object | Buffer) {
        try {
            return await jwt.sign(payload, secret.appSecret, { expiresIn: "30d" });
        }catch(err){
          console.log(err);
          return err;
        }
    }

    public async validateSignature(req:Request, res:Response, next:NextFunction) {
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
    }

    public formatData(data: any) {
        if(data){
            return {data}
        } else {
            throw new Error('No data found')
        }
    }
}