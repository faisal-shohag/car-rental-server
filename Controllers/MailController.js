import nodemailer from 'nodemailer'
import "dotenv/config"
import {htmlToText} from 'nodemailer-html-to-text';

const tp = nodemailer.createTransport({
    host: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}).use('compile', htmlToText());


const mailToAdmin = (toSend, req, res) => {
    const mailOptions = {
        from: 'cse1805027brur@gmail.com',
        to: toSend,
        subject: `New Car Booked!`,
        html: `<h3>New car has been booked by an user!</h3>`
    } 

    tp.sendMail(mailOptions, (err, info) => {
        if(err) res.status(400).send({status: 'error', error: err})
        else res.status(200).send({status: 'success', info})
    })
}

const mailToUser = (toSend, req, res) => {
    const mailOptions = {
        from: 'cse1805027brur@gmail.com',
        to: toSend,
        subject: `Successfully booked`,
        html: `<h3>You have successfully booked your car.</h3>`
    } 

    tp.sendMail(mailOptions, (err, info) => {
        if(err) res.status(400).send({status: 'error', error: err})
        else res.status(200).send({status: 'success', info})
    })
}


export {mailToAdmin, mailToUser}
