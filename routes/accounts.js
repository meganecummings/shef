const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/signup', ctrl.accountsCtrl.newUser);
router.post('/signup', ctrl.accountsCtrl.createUser);
router.get('/login', ctrl.accountsCtrl.newSession);
router.post('/login', ctrl.accountsCtrl.createSession);
router.get('/logout', ctrl.accountsCtrl.deleteSession);

module.exports = router;