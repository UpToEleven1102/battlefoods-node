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

export default router
