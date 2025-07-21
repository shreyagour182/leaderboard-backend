const mongoose = require('mongoose');
const ClaimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  claimedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);
