const router = require('express').Router();
//2 of 3 to complete: finish these html routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "../public/index.html"));
  });

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname + "../public/stats.html"));
  });

router.get('/workout', (req, res) => {
    res.sendFile(path.join(__dirname + "../public/workout.html"));
  });

module.exports = router;