const express = require("express");
const morgan = require("morgan");
const layout = require('./views/layout');
const app = express();
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.send(layout(''));
});

const PORT = 3000;

const init = async() => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
}

init();
