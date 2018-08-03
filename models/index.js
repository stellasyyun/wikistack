const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'New page'
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

function makeSlug(title){
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate(page => {
  let titleVal = page.title;
  page.slug = makeSlug(titleVal);
})

Page.belongsTo(User, { as: 'author' });

module.exports = {
 db, Page, User
}

// models.db.sync({force: true})
