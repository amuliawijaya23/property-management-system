require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);



router.post('/send', async(req, res) => {
  const mail = {
    to: req.body.recepient,
    from: req.body.sender,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };
  try {
    await sgMail.send(mail);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
});


module.exports = router;