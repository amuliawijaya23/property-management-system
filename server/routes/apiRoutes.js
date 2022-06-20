/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadFile, getFile } = require('../s3');

const { getListings, addListing } = require('../../db/db');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}
});

router.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFile(key);
  readStream.pipe(res);
});

// router.post('/images', upload.single('file'), uploadFile);
router.get('/listings/:id', async(req, res) => {
  const listings = await getListings(req.params.id);
  res.send(listings);
});

router.post('/listings', upload.single('thumbnailImage'), async(req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  const listing = {...req.body, cover_image_url: `app/api/images/${result.key}`};
  const newListing = await addListing(listing);
  res.send(newListing);
});

module.exports = router;