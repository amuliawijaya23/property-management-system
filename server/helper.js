require('dotenv').config();

const getManagementApiJwt = () => {
  const request = require("request");

  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const audience = process.env.AUDIENCE;
  const tokenUrl = process.env.TOKEN_URL;

  return new Promise((resolve, reject) => {

    const options = { method: 'POST',
      url: `${tokenUrl}`,
      headers: { 'content-type': 'application/json' },
      body: `{"client_id":"${clientId}","client_secret":"${clientSecret}","audience":"${audience}","grant_type":"client_credentials"}` };
  
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

module.exports = { getManagementApiJwt };