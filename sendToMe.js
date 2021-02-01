require('dotenv').config()
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
//condig for a site to send email
const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
    )
myOAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
const myAccessToken = myOAuth2Client.getAccessToken()

const transport = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: myAccessToken
    },
    tls: {
        rejectUnauthorized: false
    }
}
//transport function
const transporter = nodemailer.createTransport(transport)
    transporter.verify((err, success) => {
        if(err) {
            console.error(err, 'eror')
        } else {
            console.log('ready to mail')
        }
    })

//send route
router.post('/', (req, res) => {
    // console.log(req.body)
    // res.json({status: 200})
    const mail = {
        from: req.body.email,
        to: process.env.USER,
        subject: req.body.subject,
        text: `
        from: ${req.body.name}

        contact: ${req.body.email}

        message: 

        ${req.body.text}
        `
    }

    transporter.sendMail(mail, (err,data) => {
        if(err) {
          res.json({
            status: 'fail',
            err: err
          })
        } else {
          res.json({
            status: 'success'
          })
        }
      })
})

module.exports = router