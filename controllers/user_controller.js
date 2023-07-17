const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const registeruser = ((req, res, next) => {
    console.log(req.body)
    User.findOne({email: req.body.email})
        .then(user => {
            
            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return next(err)
                user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    password: hash
                })
                
                user.save()
                    .then((user) => {
                    res.status(201).json({
                        message: 'User registered successfully',
                        userId: user._id,
                    });
                    })
                    .catch(next);
                });
            
            })
.catch(next);
    })
    

const loginuser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user == null) {
                let err = new Error(`User ${req.body.email} has not been registered yet`)
                res.status(404)
                return next(err)
            }
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if (err) return next(err)
                if (!status) {
                    let err = new Error('Password does not match.')
                    res.status(401)
                    return next(err)
                }
                let data = {
                    userId: user._id,
                    user: user        
                }
                jwt.sign(data, process.env.SECRET,
                    {'expiresIn': '7d' }, (err, token) => {
                        if (err) return next(err)
                        res.json({
                            success:true,
                            status: 'Login success',
                            token: token,
                            user:user
                        })
                    })
            })

        }).catch(next)
}
const getUserByID = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json({
                success:true,
                message:'User found',
                data:user,
                
            })
             
        }).catch(next)
       
    
}



const updateUserByID = (req, res, next) => { 
    const file = req.file;
    if (file) {
        const fileName = req.file.filename;
        req.body.image = '/images/user_image/' + fileName;
    }
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, {$set: req.body }, { new: true })
        .then((user) => {
            res.status(200).json({
                success:true,
                message:'User updated successfully',
                data:user
            })
        }
        ).catch(next)

}

const changePassword = (req, res, next) => {
    if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return next(err)
            req.body.password = hash
            User.findByIdAndUpdate(req.params.id, {$set: req.body }, { new: true })
                .then((user) => {
                    res.status(200).json({
                        success:true,
                        message:'Password updated successfully',
                        data:user
                    })
                }).catch(next)       
        }
        )
    }
}

const forgotPassword = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error(`User ${req.body.email} has not been registered yet`)
                res.status(404)
                return next(err)
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return next(err)
                user.password = hash
                user.save()
                    .then((user) => {
                        res.status(200).json({
                            success:true,
                            message:'Password updated successfully',
                            data:user
                        })
                    }).catch(next)
            })
        }).catch(next)
}

module.exports = {
    registeruser,
    loginuser,
    getUserByID,
    updateUserByID,
    changePassword,
    forgotPassword
}
