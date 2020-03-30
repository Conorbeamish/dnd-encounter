const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
    transporter, 
    resetPasswordURL, 
    resetPasswordTemplate
} = require("../middleware/email");

const hashPasswordToken = ({
    password: passwordHash,
    _id: userID,
    createdAt
}) => {
    const secret = passwordHash + "-" + createdAt
    const token = jwt.sign({ userID }, secret, {
        expiresIn: 3600
    })
    return token
}

exports.sendResetEmail = async(req, res, next) => {
    const { email } = req.params
    let user
    try {
        await User.findOne({email}, function(err, result){
            if(!result){
                return next({ 
                    status: 404,
                    message: "User does not exist"
                })
            } else {
                user = result;
            }
        }).exec()

        const token = hashPasswordToken(user)
        const url = resetPasswordURL(user, token)
        const emailTemplate = resetPasswordTemplate(user, url)

        const sendEmail = () => {
            transporter.sendMail(emailTemplate, (err, info) => {
                if(err){
                    return next({
                        status: 500,
                        message: "Error sending email"
                    })
                } else {
                    return res.status(200).json(info)
                }
            })
        }
        sendEmail()
    } catch (err){
        return next({ 
            status: 404,
            message: "User does not exist"
        })
    }    
}

exports.receiveNewPassword = (req, res, next) => {
    const {userID, token} = req.params
    const {password} = req.body

    if(password.length === 0){
        return next({
            status: 400,
            message: "Password is required"
        })
    }

    User.findOne({_id: userID})
    .then(user => {
        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret)
        if(payload.userID === user.id){
            bcrypt.genSalt(10, function(err, salt){
                if(err){ return next(err)}
                bcrypt.hash(password, salt, function(err, hash){
                    if(err){ return next(err)}
                    User.findOneAndUpdate({_id: userID}, {password: hash}, function(err, result){
                        if(err){
                            return next({
                                status: 500
                            })
                        } else {
                            return(res.status(202).json("Password Changed"))
                        }
                    })
                })
            })
        }
    })
    .catch(() => {
        return next({
            status: 401,
            message: "Invalid user"
        })
    })
}