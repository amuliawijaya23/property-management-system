require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);



router.post('/send', async(req, res) => {
  try {
    await sgMail.send({...req.body});
    res.sendStatus(200);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
});


module.exports = router;