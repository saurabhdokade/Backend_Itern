const express = require('express');
const router = express.Router();
const {createBranch,getBranches,updateBranch} = require('../controller/branchController');

router.post('/branches', createBranch);
router.get('/branches/:customerId', getBranches);
router.put('/branches/:id', updateBranch);

module.exports = router;
