import mongoose  from "mongoose";
import config from '../config/config'

const databaseConnection = ()=>{
    mongoose.connect(config.mongo)
    .then(()=>{
        console.log('Connected to the server')
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default databaseConnection