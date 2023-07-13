import express,{Application} from 'express'
import process from 'node:process';
import config from './config/config';
import databaseConnection from './database/connection';
import expressApp from './expressApp';


const startServer = async ()=>{

    const app:Application = express()

    databaseConnection()
    expressApp(app)

    app.listen(config.port, ()=> {
        console.log(`Now listening on port ${config.port}`)
    })
    .on('error', (error)=>{
        console.log(error)
        process.exitCode = 1
    })
}

startServer()

