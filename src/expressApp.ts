import express, { Application } from "express";
import cors from 'cors'
import morgan from 'morgan'
import ErrorHandler from "./utils/errorHandlers";


const expressApp = (app:Application) => {
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '1mb'}))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))


app.use(ErrorHandler);
}

export default expressApp