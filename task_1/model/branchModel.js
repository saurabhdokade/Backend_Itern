const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  branch_code: String,
  location: String,
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersAuth'
  }
}, { timestamps: true });

module.exports = mongoose.model('Branch', BranchSchema);
