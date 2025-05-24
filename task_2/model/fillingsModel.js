const mongoose = require('mongoose');

const FilingSchema = new mongoose.Schema({
  filing_no: String,
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
    default: 'Draft'
  },
  customer_id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'UsersAuth'
   },
  port: String,
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Filing', FilingSchema);
