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


const mailToAdmin = (toSend, req, res, data) => {
    const mailOptions = {
        from: 'cse1805027brur@gmail.com',
        to: toSend,
        subject: `New Car Booked!-${data.carName}`,
        html: `<div style="max-width: 600px;margin: auto;padding: 16px;border: 1px solid #eee;font-size: 16px;line-height: 24px;font-family: 'Inter', sans-serif;color: #555;background-color: #F9FAFC;">
        <table style="font-size: 12px; line-height: 20px;">
            <thead>
                <tr>
                    <td style="padding: 0 16px 18px 16px;">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <div style="color: #1A1C21;font-size: 18px;font-style: normal;font-weight: 900;line-height: normal;">
                                    JATRI RENTAL</div>
                                <div>Jatri@email.com</div>
                                <div>+44 7766002333</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
    
                    <table style="background-color: #FFF; padding: 20px 16px; border: 1px solid #D7DAE0;width: 100%; border-radius: 12px;font-size: 12px; line-height: 20px; table-layout: fixed;">
                        <tbody>
                            <tr>
    
                            </tr>
                            <tr>
                                <td style="vertical-align: top;  padding-bottom: 35px;">
                                    <span style="color: #1A1C21;"><b>Client Name:</b> ${data.client.name}</span>
                                    <div style="color: #5E6470;"><b>#ID </b>1234567</div>
                                    <div style="color: #5E6470;">${data.client.phone}</div>
                                    <div style="color: #5E6470;">${data.client.email}</div>
    
                                </td>
    
                                <td style="vertical-align: top; padding-bottom: 35px; text-align:right;">
                                    <div style="font-weight: 700; color: #1A1C21;">Pick-up</div>
                                    <div style="color: #5E6470;">${data.pick}</div>
    
                                    <div style="font-weight: 700; color: #1A1C21;">Drop-off</div>
                                    <div style="color: #5E6470;">${data.drop}</div>
                                </td>
    
                            </tr>
    
                            <tr style="background-color: #eeee;">
                                <th style="text-align: left; color: #1A1C21;padding: 2px 5px;">Car</th>
                                <td style="text-align: right;padding: 2px 5px;">${data.carName}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left; color: #1A1C21;padding: 2px 5px;">Pickup Date & Time</th>
                                <td style="text-align: right;padding: 2px 5px;">${data.pickTime}</td>
                            </tr>
                            <tr style="background-color: #eeee;">
                                <th style="text-align: left; color: #1A1C21;padding: 2px 5px;">Round trip Date & Time</th>
                                <td style="text-align: right;padding: 2px 5px;">${data.roundTime ? data.roundTime : "N/A"}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left; color: #1A1C21;padding: 2px 5px;">Time Booked</th>
                                <td style="text-align: right;padding: 2px 5px;">${data.bookedTime}</td>
                            </tr>
                            <tr style="background-color: #eeee;">
                                <td style="text-align: left; padding-bottom: 13px; padding-top: 15px;padding: 2px 5px;">
                                    <div style="color: #5E6470;">Invoice number</div>
                                    <div style="font-weight: 700; color: #1A1C21;">#AB2324-01</div>
                                </td>
                                <td style="text-align: end; padding-bottom: 13px;padding: 2px 5px;">
                                    <div style="color: #5E6470;">Invoice date</div>
                                    <div style="font-weight: 700; color: #1A1C21;">${data.bookedTime}</div>
                                </td>
                            </tr>
    
                        </tbody>
                    </table>
                </tr>
            </tbody>
        </table>
    </div>`
    } 

    tp.sendMail(mailOptions, (err, info) => {
        if(err) res.status(400).send({status: 'error', error: err})
        else res.status(200).send({status: 'success', info})
    })
}

const mailToUser = (toSend, req, res, data) => {
    const mailOptions = {
        from: 'cse1805027brur@gmail.com',
        to: toSend,
        subject: `Successfully booked your car-${data.carName}!`,
        html: `
        Congratulations <b>${data.name}</b>,
        <h3>You have successfully booked your car.</h3>
        <b>Car: ${data.carName}</b><br>
        Pick up from: ${data.pick}<br>Drop off to: ${data.drop}
        <br><br><br>
        Thank you for choosing us!
        `
    } 

    tp.sendMail(mailOptions, (err, info) => {
        if(err) res.status(400).send({status: 'error', error: err})
        else res.status(200).send({status: 'success', info})
    })
}


export {mailToAdmin, mailToUser}
