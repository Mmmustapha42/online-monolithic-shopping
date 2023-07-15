import { APIError, STATUS_CODES } from "../../utils/app_errors";
import { Order, Customer } from "../models";
import  uuid  from "uuid"

interface orderAttributes {
    orderId: string,
    customerId: string,
    amount: number,
    status: string,
    txnId: string
    items: Array<object>
}

interface ProductAtrributes {
    name: string,
    desc: string,
    banner: string,
    type: string,
    unit: number,
    price: number,
    language: string
    available: boolean,
    supplier: string
}


export class ShoppingRepository {
   public static async Orders(customerId: string){
        try{
            const orders = await Order.find({customerId }).populate('items.product');        
            return orders;
        }catch(err){
            throw Error('unable to find order')
        }
    }

    public static async CreateNewOrder(customerId: string, txnId: string){
        //check transaction for payment Status
        
        try{
            const profile = await Customer.findById(customerId).populate('cart.product');
    
            if(profile){
                
                let amount = 0;   
    
                let cartItems = profile;
    
                if(cartItems.length > 0){
                    //process Order
                    cartItems.map((item: { product: { price: string; }; unit: string; }) => {
                        amount += parseInt(item.product.price) *  parseInt(item.unit);   
                    });


        
                    const orderId = uuid.v4()
        
                    const order = new Order({
                        orderId,
                        customerId,
                        amount,
                        txnId,
                        status: 'received',
                        items: cartItems
                    })
                    await order.save()
        
                    profile.cart = [];
                    
                    order.populate('items.product');
                    const orderResult = await order.save();
                    profile.orders.push(orderResult);
                    await profile.save();
                    return orderResult;
                }
            }
    
          return {}

        }catch(err){
            throw Error('Unable to Find Category')
        }
        

    }
}