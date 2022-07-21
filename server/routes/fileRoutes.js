/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { uploadDoc, getDoc } = require('../s3');
const { upload } = require('../multer');
const { getListingFiles, uploadFileData, updateFileData } = require('../../db/queries/files');

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
    name: file.originalname,
    file_type: file.mimetype,
    listing_id: req.params.id,
    ...req.body
  };

  await uploadFileData(fileData);
  const files = await getListingFiles(req.params.id);
  res.send(files);
});

router.put('/archive', async (req, res) => {
  const data = {...req.body};
  await updateFileData(data);

  const files = await getListingFiles(data.listing_id);
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
