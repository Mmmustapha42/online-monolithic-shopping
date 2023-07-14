import mongoose, {Document, Schema} from "mongoose";

interface addressAttributes {
    street: string,
    postalCode: string,
    city: string,
    country: string,
}

interface IAddress extends addressAttributes, Document {}

const AddressSchema:Schema = new mongoose.Schema<IAddress>({
    street: {type:String, required: true},
    postalCode: {type:String, required: true},
    city: {type:String, required: true},
    country: {type:String, required: true},
})

export default mongoose.model('Address', AddressSchema)