/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getFile, uploadFile } = require('../s3');
const { upload } = require('../multer');
const { getListingImages, uploadImageData } = require('../../db/db');

router.get('/listing/:id', async(req, res) => {
  const id = req.params.id;
  const images = await getListingImages(id);
  res.send(images);
});

router.post('/listing', upload.single('image') ,async(req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  const img = {
    id: result.key,
    link: `app/images/${result.key}`,
    ...req.body
  };
  await uploadImageData(img);
  const images = await getListingImages(req.body.listing_id);
  res.send(images);
});

router.get('/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFile(key);
  readStream.pipe(res);
});

module.exports = router;