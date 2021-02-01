const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
//condig for a site to send email
const transport = {
    service: 'gmail',
    // auth: {
    //     user: process.env.USER,
    //     pass: process.env.PASS
    // },
}
//transport function
const transporter = nodemailer.createTransport(transport)
    transporter.verify((err, success) => {
        if(err) {
            console.error(err)
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
        from: 
        ${req.body.name}

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