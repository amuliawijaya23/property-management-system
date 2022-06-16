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
  audience: `${process.env.HOIST_API}`,
  issuer: `${process.env.ISSUER}`,
  algorithms: ['RS256']
});

router.use(jwtCheck);

router.get('/organization/:id', jwtCheck,  (req, res) => {

  getManagementApiJwt()
    .then(data => {
      const token = data.access_token;
  
      axios.get(`${process.env.MANAGEMENT_API}/organizations/${req.params.id}/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => res.send(response.data))
        .catch((error) => console.log(error.message));
    });
});

module.exports = router;