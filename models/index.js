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
    allowNull: false,
    validate: {
      isUrl: true
    },
    defaultValue: 'www.google.com'
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

module.exports = {
 db, Page, User
}

// models.db.sync({force: true})
