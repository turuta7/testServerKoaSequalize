const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/db');
const User = require('../model/user');

const saltRounds = 10;
const secret = 'test';

const router = new Router();

// -----------------
router.post('/test', async (ctx, next) => {
  const res = User.findAll({ where: { login: ctx.request.body.login } }).then(
    project => {
      const res1 = project.map(x => {
        return x.dataValues;
      });
      return res1;
    },
  );
  ctx.body = await res;
  next();
});

// addUser
router.post('/addUser', async (ctx, next) => {
  // jwt.verify(token, secret, (err, decoded) => {
  //   if (err) {
  //     console.log('not user');
  //     return;
  //   }
  //   console.log(decoded);
  // });

  const res = ctx.request.body;
  if (!res.login) {
    console.log('not login');
    ctx.status = 500;
    ctx.body = ['not login'];
    return;
  }
  if (!res.password) {
    console.log('not password');
    ctx.status = 500;
    ctx.body = ['not password'];
    return;
  }
  if (!res.firstName) {
    console.log('not firstName');
    ctx.status = 500;
    ctx.body = ['not firstName'];
    return;
  }
  if (!res.lastName) {
    console.log('not lastName');
    ctx.status = 500;
    ctx.body = ['not lastName'];
    return;
  }
  if (!res.eMail) {
    console.log('not eMail');
    ctx.status = 500;
    ctx.body = ['not eMail'];
    return;
  }

  const resUser = User.findAll({
    where: { login: res.login },
  }).then(project => {
    const res1 = project.map(x => {
      return x.dataValues;
    });
    return res1;
  });
  console.log((await resUser).length);

  if ((await resUser).length <= 0) {
    const token = jwt.sign('turuta', secret);
    console.log({ token });
    ctx.body = [`token: ${token}`];

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(res.password, salt, (error, hash) => {
        if (error) {
          console.log(err);
        }
        console.log(hash);

        // const rez = bcrypt.compareSync('tttt1', hash);
        // console.log(rez);

        sequelize.sync().then(x => {
          User.create({
            login: res.login,
            password: hash,
            firstName: res.firstName,
            lastName: res.lastName,
            eMail: res.eMail,
          });
          return x;
        });
      });
    });
    console.log('ok');
    ctx.body = [`user add, token: ${token}`];
  }

  console.log('user in db');
  ctx.body = ['message: user login db'];

  next();
});

module.exports = router;
