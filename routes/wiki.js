const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
/*   const postTitle = Page.title;
  const postContent = Page.content;

  const page = new Page({
    title: postTitle,
    content: postContent
  })

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error)} */
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
