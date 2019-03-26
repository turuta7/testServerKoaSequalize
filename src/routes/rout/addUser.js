const Router = require('koa-router');
const User = require('../../model/user');
const sequelize = require('../../db/db');

const router = new Router();

router.post('/addUser', async (ctx, next) => {
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

  sequelize.sync().then(x => {
    User.create({
      login: res.login,
      password: res.password,
      firstName: res.firstName,
      lastName: res.lastName,
      eMail: res.eMail,
    });
    return x;
  });

  ctx.body = 'its work';
  next();
});

module.exports = router;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../../model/user');
// const sequelize = require('../../db/db');

// const saltRounds = 10;

// // const secret = require('../../config/config').toString();

// const secret = 'test';

// bcrypt.genSalt(saltRounds, (err, salt) => {
//   bcrypt.hash('tttt', salt, (error, hash) => {
//     if (error) {
//       console.log(error);
//     }

//     console.log(hash);

//     // if (!userLog) {
//     //   console.log('not login');
//     //   // return res.status(400).send(['not login']);
//     // }
//     // if (!userPass) {
//     //   console.log('not password');
//     //   // return res.status(400).send(['not password']);
//     // }
//     // if (!firstName) {
//     //   console.log('not firstName');
//     //   // return res.status(400).send(['not firstName']);
//     // }
//     // if (!lastName) {
//     //   console.log('not lastName');
//     //   // return res.status(400).send(['not lastName']);
//     // }
//     // if (!eMail) {
//     //   console.log('not eMail');
//     //   // return res.status(400).send(['not eMail']);
//     // }

//     sequelize.sync().then(x => {
//       const loginUser = 'turuta';
//       User.create({
//         login: loginUser,
//         password: hash,
//         firstName: 'test',
//         lastName: 'test',
//         eMail: 'test',
//       });
//       return x;
//     });

//     const token = jwt.sign({ login: hash }, secret);
//     console.log('200 ok', { token });

//     // res.status(200).send({ token });
//   });
// });

// // module.exports = router;
