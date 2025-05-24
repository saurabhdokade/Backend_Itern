const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../model/userModel");
const Branch = require("../model/branchModel");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    name,
    gstin
  } = req.body;

  if (!name || !email || !gstin) {
    return next(new ErrorHander("Please fill all required fields", 400));
  }
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    return next(new ErrorHander("User already exists", 400));
  }

  // Create new user
  const user = await User.create({
    email,
   name,
   gstin
  });

  
  res.status(201).json({
    success: true,
    message: "User registered successfully."
  });
});


exports.getCustomerWithBranches = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);
    const branches = await Branch.find({ customer_id: req.params.id });
    res.json({ customer, branches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCustomersWithBranches = async (req, res) => {
  try {
    const customers = await User.find();
    const data = await Promise.all(customers.map(async (cust) => {
      const branches = await Branch.find({ customer_id: cust._id });
      return { customer: cust, branches };
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Branch.deleteMany({ customer_id: req.params.id });
    res.json({ message: 'Customer and related branches deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

