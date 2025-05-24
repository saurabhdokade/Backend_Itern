const Filing = require('../model/fillingsModel');

// Create new filing
exports.createFiling = async (req, res) => {
  try {
    const filing = await Filing.create(req.body);
    res.status(201).json(filing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get filing by ID
exports.getFiling = async (req, res) => {
  try {
    const filing = await Filing.findById(req.params.id);
    if (!filing) return res.status(404).json({ error: 'Filing not found' });
    res.json(filing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status manually
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Submitted', 'Approved', 'Rejected'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    const filing = await Filing.findByIdAndUpdate(
      req.params.id,
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!filing) return res.status(404).json({ error: 'Filing not found' });
    res.json(filing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
