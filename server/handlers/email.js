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

exports.sendResetEmail = async(req, res) => {
    const { email } = req.params
    let user
    try {
        user = await User.findOne({email}).exec()
    } catch (err){
        res.status(404).json("User does not exist")
    }
    const token = hashPasswordToken(user)
    const url = resetPasswordURL(user, token)
    const emailTemplate = resetPasswordTemplate(user, url)

    const sendEmail = () => {
        transporter.sendMail(emailTemplate, (err, info) => {
            if(err){
                res.status(500).json("Err sending mail")
            } else {
                return res.status(200).json(info)
            }
        })
    }
    sendEmail()
}

exports.receiveNewPassword = (req, res) => {
    const {userID, token} = req.params
    const {password} = req.body

    User.findOne({_id: userID})
    .then(user => {
        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret)
        if(payload.userID === user.id){
            bcrypt.genSalt(10, function(err, salt){
                if(err) return
                bcrypt.hash(password, salt, function(err, hash){
                    if(err) return
                    User.findOneAndUpdate({_id: userID}, {password: hash})
                    .then(() => res.status(202).json("Password Changed"))
                    .catch(err => res.status(500).json(err))
                })
            })
        }
    })
    .catch(() => {
        res.status(401).json("Invalid User")
    })
}