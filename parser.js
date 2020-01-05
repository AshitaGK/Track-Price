require('dotenv').config() 
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nightmare = require('nightmare')()
//"priceblock_ourprice"
const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]


checkPrice()
"https://www.amazon.in/Canon-1500D-Digital-Camera-S18-55/dp/B07BS4TJ43"
async function checkPrice() {
    try {
       
        const priceString = await nightmare.goto(url)
                                    .wait("#priceblock_ourprice")
                                    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                    .end()
const priceNumber = parseFloat(priceString.replace('₹', ''))                             

if(priceNumber < minPrice) {
    await sendEmail('Price is low',
    `the price on ${url} has dropped below ${minPrice}`
    )

 }
}

 catch (e){
      await sendEmail('Amazon Price Checker error', e.message)
       throw e
    }
}



function sendEmail(subject, body) {
 const email = {
     to: 'terayat628@onmail.top',
     from: 'amazon-price-checker@example.com',
     subject: subject,
     text: body,
     html: body
 } 
 return sgMail.send(email)   
}
