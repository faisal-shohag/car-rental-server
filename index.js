import terminalLink from 'terminal-link';
import ip from 'ip';
import express from "express"
import "dotenv/config"
import cors from 'cors';
import bodyParser from 'body-parser'
import { mailToAdmin, mailToUser } from './Controllers/MailController.js';


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000

app.use(cors())


app.get('/', (req, res) => {
    res.send("🚀 Working fine!")
})

app.post('/mail-to-admin', (req, res) => {
    const {email} = req.body
    // console.log(email)
    // res.send({'success': 'ok'})
    mailToAdmin(email, req, res, req.body)
})

app.post('/mail-to-user', (req, res) => {
    const {email} = req.body
    mailToUser(email, req, res, req.body)
})


app.listen(PORT, () => {
    const localhost = terminalLink('on localhost:', `localhost:${PORT}`);
    const network = terminalLink('On your network:', `${ip.address()}:${PORT}`);
    console.log(`🚀 App is Running\n${localhost}\n${network}`)
})
  
  
  
  
export default app