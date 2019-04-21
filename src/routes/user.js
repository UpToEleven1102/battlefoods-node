import express from 'express'

import User from '../models/user'

import { verifyToken } from './auth'

const router = express.Router()

router.post('/', verifyToken, (req, res, next) => {
    User.findById(req.userId, function (err, user) {
        if (err)
            return next(err);
        user.score = req.body.score;
        user.save()
        res.json({success: true})
    })
})

router.get('/top-players', verifyToken, (req, res, next) => {
    User.find({}).sort({score: -1}).limit(5).exec(function(err, users){
        if (err) 
            return next(err);
        res.json({success: true, data: users})
    })
})

export default router
