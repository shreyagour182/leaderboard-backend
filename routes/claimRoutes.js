const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// ✅ Claim random points for a user
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // ✅ Update user totalPoints
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: randomPoints } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Log claim in history
    const claim = new ClaimHistory({ userId, points: randomPoints });
    await claim.save();

    // ✅ Update leaderboard
    const users = await User.find().sort({ totalPoints: -1 });
    const rank = users.findIndex(u => u.id === user.id) + 1;

    res.status(200).json({ user, randomPoints, rank, leaderboard: users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

module.exports = router;
