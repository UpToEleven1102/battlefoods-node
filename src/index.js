import express from 'express'

const app = express()

app.use('/test', (req, res) => {
    res.json({success: true, message: 'test route'})
})

app.listen(8080, () => console.log('listening on port 8080'))