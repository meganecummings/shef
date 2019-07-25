const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.profileCtrl.showProfile);

module.exports = router;