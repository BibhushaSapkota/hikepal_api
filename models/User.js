const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    image:{
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    role:{
        type: String,
        enum:['Admin','User'],
        default: 'User'
    },
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)

