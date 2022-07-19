/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/description', async(req, res) => {
  const {
    title,
    address,
    property_type,
    zip_code,
    size,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_space
  } = req.body;

  const setPrompt = `Generate a professional real estate listing descripton for a ${number_of_bedrooms} bedroom and ${number_of_bathrooms} bathroom ${property_type} located in ${address} with the size of ${size} sqft and ${parking_space} parking available`;

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: setPrompt,
    temperature: 0.8,
    max_tokens: 200,
    top_p: 1,
  });

  res.json((response.data.choices[0].text).trim());
});

router.post('/email', async(req, res) => {
  const service = req.body.service;
  
  const setPrompt = `Write me a professional and smart cold email for real estate ${service}`;
  
  
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: setPrompt,
    temperature: 0.8,
    max_tokens: 500,
    top_p: 1,
  });
  
  res.json((response.data.choices[0].text));
});



module.exports = router;