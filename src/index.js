import express from 'express'

import authRoutes from '../routes/auth'

const app = express()

app.use('/test', (req, res) => {
    res.json({success: true, message: 'test route'})
})

app.use('/auth', authRoutes)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT? process.env.PORT: '8080'}`))