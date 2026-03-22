const express = require('express');
const router = express.Router();
const { createClip, getClip } = require('../controllers/clipController');

router.post('/create', createClip);
router.get('/:code', getClip);

module.exports = router;
