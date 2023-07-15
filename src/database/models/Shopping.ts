import mongoose, {Document, Schema} from "mongoose";

interface orderAttributes {
    orderId: string,
    customerId: string,
    amount: number,
    status: string,
    txnId: string
    items: Array<object>
}

interface IOrder extends orderAttributes, Document {}

const OrderSchema:Schema = new mongoose.Schema<IOrder>({
    orderId: {type:String, required: true},
    customerId: {type:String, required: true},
    amount: {type:Number, required: true},
    status: {type:String, required: true},
    txnId: {type:String, required: true},
    items: [
        {   
            product: {type: Schema.Types.ObjectId, ref: 'product', required: true} ,
            unit: { type: Number, require: true} 
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
})

export default mongoose.model('Order', OrderSchema)