/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { uploadDoc, getDoc } = require('../s3');
const { upload } = require('../multer');
const { getListingImages, uploadImageData, getListingFiles, uploadFileData } = require('../../db/db');

// router.get('/listing/:id', async(req, res) => {
//   const id = req.params.id;
//   const images = await getListingImages(id);
//   res.send(images);
// });

// router.post('/listing/:id', upload.single('image') ,async(req, res) => {
//   const file = req.file;
//   const result = await uploadFile(file);
//   const img = {
//     id: result.key,
//     link: `/images/${result.key}`,
//     listing_id: req.params.id,
//     ...req.body
//   };

//   await uploadImageData(img);
//   const images = await getListingImages(req.params.id);
//   res.send(images);
// });

// router.get('/:key', (req, res) => {
//   const key = req.params.key;
//   const readStream = getFile(key);
//   readStream.pipe(res);
// });

router.get('/listing/:id', async(req, res) => {
  const id = req.params.id;
  const files = await getListingFiles(id);
  res.send(files);
});

router.post('/listing/:id', upload.single('file'), async(req, res) => {
  const file = req.file;
  const result = await uploadDoc(file);
  const fileData = {
    id: result.key,
    link: `/files/${result.key}`,
    listing_id: req.params.id,
    ...req.body
  };

  await uploadFileData(fileData);
  const files = await getListingFiles(req.params.id);
  res.send(files);
});

router.get('/:key', (req, res) => {
  const key = req.params.key;
  res.attachment(key);
  const fileUrl = getDoc(key);

  res.send(fileUrl);
  // filestream.pipe(res);
});

module.exports = router;
