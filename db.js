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
})

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
