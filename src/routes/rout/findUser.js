const User = require('../../model/user');
// const router = require('../src/routes/index');

// router.post('/test', async (ctx, next) => {

User.findAll({ where: { login: '1111' } }).then(project => {
  const res = project.map(x => x.dataValues);
  console.log(res);
});
//module.exports = router;
