const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.userCtrl.index);
router.post('/', ctrl.userCtrl.new);
router.get('/:name', ctrl.userCtrl.show);

module.exports = router;