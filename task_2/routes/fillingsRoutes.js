const express = require('express');
const router = express.Router();
const {createFiling,getFiling,updateStatus} = require('../controller/fillingsController');

router.post('/filings', createFiling);
router.get('/filings/:id', getFiling);
router.put('/filings/:id/status', updateStatus);

module.exports = router;
