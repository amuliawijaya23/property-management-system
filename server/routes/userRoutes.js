require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

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

router.get('/login', jwtCheck, async(req, res) => {
  const token = await getManagementApiJwt();
  const url = `${process.env.MANAGEMENT_API}/clients/Y8UigYR4SGqNwr50G1tvWm66b1sb5Yya`;
  const headers = {
    'content-type': 'application/json',
    uthorization: `Bearer ${token.access_token}`,
    'cache-control': 'no-cache'
  };
  const data = {
    // eslint-disable-next-line camelcase
    initiate_login_uri: 'https://my-property-management-system.herokuapp.com/user/login'
  };

  try {
    const response = await axios.patch(url, { headers: headers, data: data});
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.body : error);
  }
});

module.exports = router;