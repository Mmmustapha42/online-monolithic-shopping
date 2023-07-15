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

interface addressAttributes {
    _id: string,
    street: string,
    postalCode: string,
    city: string,
    country: string,
}

export interface CustomerAttributes {
    name: string,
    email: string,
    password: string,
    phone: number,
    address: Array<addressAttributes>
    cart:Array<object>
    wishlist:Array<object>
    orders:Array<object>
}

export interface ICustomer extends CustomerAttributes, Document {}

const CustomerSchema:Schema = new mongoose.Schema<ICustomer>({
    name: String,
    email: { type: String, required: true, unique:true},
    password: String,
    phone: Number,
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