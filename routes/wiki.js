const express = require('express');
const router = express.Router();

const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

const { Page } = require('../models');
const { User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(mainPage(allPages));
    // res.redirect('/wiki');
  } catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
  try {
    const authorName = req.body.name;
    const authorEmail = req.body.email;

    const [user, didWork] = await User.findOrCreate({where: {name: authorName, email: authorEmail}});
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error)}
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const findslug = req.params.slug;
    //console.log(findslug);
    const data = await Page.findOne({
      where: {slug: findslug}
    })
    const username = await data.getAuthor();
    //console.log(username);
    res.send(wikiPage(data.dataValues));
  } catch (error) { next(error) }
});

module.exports = router;
