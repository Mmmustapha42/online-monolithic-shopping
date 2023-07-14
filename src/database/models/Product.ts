import mongoose,{Document, Schema} from "mongoose";

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

interface IProduct extends ProductAtrributes, Document {}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: {type:String, required: true},
    desc: {type:String, required: true},
    banner: {type:String, required: true},
    type: {type:String, required: true},
    unit: {type:Number, required: true},
    price: {type:Number, required: true},
    available: {type:Boolean, required: true},
    supplier: {type:String, required: true},
})

export default mongoose.model('Product', ProductSchema)