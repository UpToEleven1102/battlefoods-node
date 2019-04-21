import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user'

const router = express.Router()

function createToken(user) {
    var token = jwt.sign({ user_name: user.user_name, id: user._id }, process.env.SECRET_KEY)
    return token
}

export function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ success: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err)
            return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    })
}

router.get('/me', verifyToken, (req, res, next) => {
    User.findById(req.userId, function (err, user) {
        if (err)
            return next(err);

        if (user)
            res.status(200).send({ success: true, user: user })
        else
            res.status(404).send({ success: false, message: 'No user found'})
    })
})

router.post('/signin', (req, res, next) => {
    User.findOne({ user_name: req.body.user_name }, (err, user) => {
        if (err)
            return next(err)

        if (user) {
            if (user.comparePassword(req.body.password)) {
                res.json({ success: true, token: createToken(user) })
                return next()
            }
            res.json({ success: false, message: 'Invalid credentials' })
        } else {
            res.json({ success: false, message: 'No user found' })
        }

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
            user.score = 0
            user.save(function (err, user) {
                if (err) return next(err)
                var token = createToken(user)
                res.json({ success: true, token: token })
            })
        }
    })
})

router.post('/signout', (req, res) => {
    res.json({ message: 'sign out' })
})

export default router
