import express from 'express'
import passport from 'passport'

const router = express.Router()

router.post('/signin', (req, res)=> {
    res.json({message: 'signin route'})
})

router.post('/signup', (req, res)=> {
    res.json({message: 'singup route'})
})

router.post('/signout', (req,res) => {
    res.json({message: 'sign out'})
})

export default router