const express = require("express");
const {
  registerUser,getCustomerWithBranches,
  getAllCustomersWithBranches,updateCustomer,deleteCustomer

} = require("../controller/userController");




const router = express.Router();

router.route("/signup").post(registerUser);
router.get('/customers/:id', getCustomerWithBranches);
router.get('/customers', getAllCustomersWithBranches);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);
module.exports = router;