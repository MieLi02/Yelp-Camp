const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');
const { checkReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post( catchAsync(users.register))

router.route('/login')
    .get(users.renderLoginForm)
    // need to use checkReturnTo because passport.authenticate will result in a new session, overriding what we want
    .post(checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router;