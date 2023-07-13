import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL || ''
const PORT = process.env.PORT || 3000
const APP_SECRET = process.env.APP_SECRET || ''

const config = {
    mongo:MONGODB_URL,
    port:PORT,
    appSecret:APP_SECRET
    
}

export default config