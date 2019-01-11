// const nodemailer = require('nodemailer')
// const xoauth2 = require('xoauth2')

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: 'arunarularasi24@gmail.com',
//             clientId: '515525036810-atdn651q6ig6fqu67q6lnu31u2rhun6r.apps.googleusercontent.com',
//             clientSecret: 'mHOppIygtUig8CqHInFdkTWW',
//             refreshToken: '1/DrZrnkKVHpgyef3flJY4pdwRxhabauwARjLPlY0uDPo'
//         })
//     }
// })

// var mailOptions={
//     from: 'Arun <arunarularsi24@gmail.com>',
//     to: 'arunpasupathi24@gmail.com',
//     subject: 'Node',
//     text: 'Hi'
// }

// transporter.sendMail(mailOptions, function(err, res){
//     if(err){
//         console.log('Err')
//         console.log(err)
//     }else{
//         console.log('Email')
//     }
// })