import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth'

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true }, err => {
    if (err)
        console.log(err)
    else console.log('Connected to DB')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/test', (req, res) => {
    res.json({ success: true, message: 'test route' })
})

app.use('/auth', authRoutes)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT ? process.env.PORT : '8080'}`))