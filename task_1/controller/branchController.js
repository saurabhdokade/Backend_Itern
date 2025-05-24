const Branch = require('../model/branchModel');

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranches = async (req, res) => {
  try {
const branches = await Branch.find({ customer_id: req.params.customerId });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
