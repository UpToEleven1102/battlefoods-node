import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user'

const router = express.Router()

function createToken(user_name){
    var token = jwt.sign({user_name: user_name}, process.env.SECRET_KEY)
    return token
}

router.post('/signin', (req, res, next) => {
    User.findOne({user_name: req.body.user_name}, (err, user) => {
        if (err)
            return next(err)

        if (user) {
            if(user.comparePassword(req.body.password)){
                res.json({success: true, token: createToken(user.user_name)})
                return next()
            }
        }

        res.json({success: false, message: 'Invalid credentials'})
    })
})

router.post('/signup', (req, res, next) => {
    User.findOne({ user_name: req.body.user_name }, (err, user) => {
        if (err)
            return next(err)
        if (user) {
            res.json({ success: false, message: 'User name already exists' })
        } else {
            let user = new User()
            user.user_name = req.body.user_name
            user.password = req.body.password
            user.save(function (err) {
                if (err) return next(err)
                var token = createToken(user.user_name)
                res.json({succes: true, token: token})
            })
        }
    })
})

router.post('/signout', (req, res) => {
    res.json({ message: 'sign out' })
})

export default router