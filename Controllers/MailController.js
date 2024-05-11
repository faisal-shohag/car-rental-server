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
        subject: `New Car Booked!`,
        html: `<div style="max-width: 800px;margin: auto;padding: 16px;border: 1px solid #eee;font-size: 16px;line-height: 24px;font-family: 'Inter', sans-serif;color: #555;background-color: #F9FAFC;">
        <table style="font-size: 12px; line-height: 20px;">
            <thead>
                <tr>
                    <td style="padding: 0 16px 18px 16px;">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <img style="height:80px;" src="https://i.postimg.cc/wvDz4sKT/image.png" />
                            </div>
    
                            <div>
                                <h1 style="color: #1A1C21;font-size: 18px;font-style: normal;font-weight: 600;line-height: normal;">
                                    JATRI RENTAL</h1>
                                <p>Jatri@email.com</p>
                                <p>+44 7766002333</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table style="background-color: #FFF; padding: 20px 16px; border: 1px solid #D7DAE0;width: 100%; border-radius: 12px;font-size: 12px; line-height: 20px; table-layout: fixed;">
                            <tbody>
                                <tr>
                                    <td style="vertical-align: top; width: 30%; padding-right: 20px;padding-bottom: 35px;">
                                        <p style="font-weight: 700; color: #1A1C21;">Clent Name: ${data.client.name}</p>
                                        <p style="color: #5E6470;">${data.client.address}</p>
                                        <p style="color: #5E6470;">${data.client.email}</p>
                                    </td>
                                    <td style="vertical-align: top; width: 35%; padding-right: 20px;padding-bottom: 35px;">
                                        <p style="font-weight: 700; color: #1A1C21;">Pick-up</p>
                                        <p style="color: #5E6470;">${data.pick}</p>
    
                                        <p style="font-weight: 700; color: #1A1C21;">Drop-off</p>
                                        <p style="color: #5E6470;">${data.drop}</p>
                                    </td>
                                    <td style="vertical-align: top;padding-bottom: 35px;">
                                        <table style="table-layout: fixed;width:-webkit-fill-available;">
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Client ID</th>
                                                <td style="text-align: right;">123567</td>
                                            </tr>
                                                <tr>
                                                <th style="text-align: left; color: #1A1C21;">Car</th>
                                                <td style="text-align: right;">${data.carName}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Pickup Date & Time</th>
                                                <td style="text-align: right;">${data.pickTime}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Round trip Date & Time</th>
                                                <td style="text-align: right;">${data.roundTime ? data.roundTime : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Time Booked</th>
                                                <td style="text-align: right;">${data.bookedTime}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 13px;">
                                        <p style="color: #5E6470;">Service </p>
                                        <p style="font-weight: 700; color: #1A1C21;">Delivery Service</p>
                                    </td>
                                    <td style="text-align: center; padding-bottom: 13px;">
                                        <p style="color: #5E6470;">Invoice number</p>
                                        <p style="font-weight: 700; color: #1A1C21;">#AB2324-01</p>
                                    </td>
                                    <td style="text-align: end; padding-bottom: 13px;">
                                        <p style="color: #5E6470;">Invoice date</p>
                                        <p style="font-weight: 700; color: #1A1C21;">${data.bookedTime}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <table style="width: 100%;border-spacing: 0;">
                                            <hr/>
                                            
                                            <tfoot>
                                                
                                                <tr>
                                                    <td>
                                                        <p style="color: #1A1C21;">(1) VAT non applicable</p>
                                                        <p style="color: #1A1C21;">(2) Price includes the remuneration for
                                                            MealShift Services</p>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding-top: 30px;">
                        <p style="display: flex; gap: 0 13px;"><span style="color: #1A1C21;font-weight: 700;">Jatri Rental Ltd</span><span>Dhanmondi, Dhaka - E1 7QL</span><span>Registration number:12793366</span></p>
                        <p style="color: #1A1C21;">Any questions, contact customer service at <a href="mailto:support@jatri.co.bd" style="color: #000;">support@mealshift.co.uk</a>.</p>
                    </td>
                </tr>
            </tfoot>
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
