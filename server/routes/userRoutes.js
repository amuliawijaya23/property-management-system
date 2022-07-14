require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

const { getListingWatchers } = require('../../db/db');

const { getManagementApiJwt } = require('../helper');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.JWKSURI}`
  }),
  audience: `${process.env.PROPERTEE_API}`,
  issuer: `${process.env.ISSUER}`,
  algorithms: ['RS256']
});

router.use(jwtCheck);

router.get('/organization/:id', jwtCheck,  async(req, res) => {
  const token = await getManagementApiJwt();
  const url = `${process.env.MANAGEMENT_API}/organizations/${req.params.id}/members`;
  const headers = { Authorization: `Bearer ${token.access_token}` };

  try {
    const response = await axios.get(url, { headers: headers });
    res.send(response.data);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

router.get('/role/:id', jwtCheck, async(req, res) => {
  const token = await getManagementApiJwt();
  const url = `${process.env.MANAGEMENT_API}/users/${req.params.id}/roles`;
  const headers = { Authorization: `Bearer ${token.access_token}`};

  try {
    const response = await axios.get(url, { headers: headers });
    res.send(response.data);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

module.exports = router;