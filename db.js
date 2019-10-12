const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  username: STRING,
  password: STRING,
});

User.authenticate = async function(credentials) {
  const { username, password } = credentials;
  const user = await this.findOne({
    where: { username, password }
  });
  if(user) {
    return user;
  }
  throw ({ status: 401 })
}

const syncAndSeed = () => {
  await conn.sync({ force: true});
  const usernames = ['moe', 'lucy', 'larry', 'curly']

  const [moe, lucy, larry, curly] = await Promise.all(usernames.map(username => User.create({username, password: username.toUpperCase()})))
  return {
    moe,
    lucy,
    larry,
    curly
  }
};

module.exports = {
  syncAndSees,
  models: {
    User
  }
}
