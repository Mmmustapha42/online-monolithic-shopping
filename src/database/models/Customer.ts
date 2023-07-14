import mongoose, {Document, Schema} from "mongoose";

type product = {
    id:string
    name: string
    banner:string
    price:number
}

type Address = {

}

type WishContainer = {
    id:string
    name:string
    description:string
    banner:string
    available:boolean
    price:number
}

type OrddrContainer = {
    id:string
    amount:string
    date:Date
}

export interface CustomerAttributes {
    email: string,
    password: string,
    salt: string,
    phone: string,
    address: Array<object>
    cart:Array<object>
    wishlist:Array<object>
    orders:Array<object>
}

export interface ICustomer extends CustomerAttributes, Document {}

const CustomerSchema:Schema = new mongoose.Schema<ICustomer>({
    email: String,
    password: String,
    phone: String,
    address:[
        { type: Schema.Types.ObjectId, ref: 'address', required: true }
    ],
    cart: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'product', required: true},
          unit: { type: Number, require: true}
        }
    ],
    wishlist:[
        { 
            type: Schema.Types.ObjectId, ref: 'product', required: true
        }
    ],
    orders: [ 
        { type: Schema.Types.ObjectId, ref: 'order', required: true }
    ]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            // delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

export default  mongoose.model('Customer', CustomerSchema);