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

router.get('/login', jwtCheck, async(req, res) => {
  const token = await getManagementApiJwt();
  const url = `${process.env.MANAGEMENT_API}/clients/Y8UigYR4SGqNwr50G1tvWm66b1sb5Yya`;
  const headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${token.access_token}`,
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

// const options = {
//   method: 'PATCH',
//   url: 'https://dev-ptyxcp1a.au.auth0.com/api/v2/clients/Y8UigYR4SGqNwr50G1tvWm66b1sb5Yya',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer API2_ACCESS_TOKEN',
//     'cache-control': 'no-cache'
//   },
//   // eslint-disable-next-line camelcase
//   data: {initiate_login_uri: '<login_url>'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

module.exports = router;