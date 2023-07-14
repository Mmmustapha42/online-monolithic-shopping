import { Router, Request, Response } from "express";
import {UserController} from "../controllers/customerController";

const router = Router()

// class CustomerRouter {
//     public customerController = new UserController ()
//     public router = Router();

//     constructor() {
//         this.initializeRoutes();
//       }

//     public initializeRoutes() {
//         this.router
//         .get('/', (req:Request, res:Response)=>{
//             res.send('lets start')
//         })
//     }
// }

router.get("/entries", (req:Request, res:Response)=>{
    res.send('lets start')
});
router.get("/customers", UserController.getCustomers)



export default router