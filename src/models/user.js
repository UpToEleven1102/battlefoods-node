import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: {type: String, unique: true, lowercase: true},
    password: String,
    score: Number,
})

UserSchema.pre('save', function(next){
    let user = this
    console.log(user)

    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err)
        return next()

        this.password = bcrypt.hashSync(this.password, salt)
    })
    next()
})

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', UserSchema)