const nodemailer = require("nodemailer");
require("dotenv").config({path: "../.env"});

exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.resetPasswordURL = (user, token) => {
    return `https://cb-dndencounter-client.herokuapp.com/reset/${user._id}/${token}`
}

exports.resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_USERNAME
    const to = user.email
    const subject = "DnD Encounter password reset"
    const html = `
        <p>Hello ${user.username},<p>
        <p>You have requested a password reset, click the link below to choose a new password</p>
        <a href = ${url}> ${url} </a>
        <p>Happy Adventuring!</p>
        <p>The team at DnD Encounter</p>
    `
    return {from, to, subject, html}
}

