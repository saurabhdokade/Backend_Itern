const Filing = require('../model/fillingsModel');

const simulateWebhook = async () => {
  const filings = await Filing.find({ status: 'Submitted' });

  for (const filing of filings) {
    // Randomly approve or reject
    const newStatus = Math.random() > 0.5 ? 'Approved' : 'Rejected';
    filing.status = newStatus;
    filing.updated_at = new Date();
    await filing.save();

    console.log(`Webhook: Filing ${filing.filing_no} updated to ${newStatus}`);
  }
};

module.exports = () => {
  setInterval(simulateWebhook, 10000); // every 10 seconds
};
