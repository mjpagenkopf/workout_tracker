const router = require('express').Router();
//2 of 3 to complete: finish these html routes
//homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "../public/index.html"));
  });
//dashboard
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname + "../public/stats.html"));
  });
//
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname + "../public/exercise.html"));
});

module.exports = router;


/* router.get('/workout', (req, res) => {
  res.sendFile(path.join(__dirname + "../public/workout.html"));
}); */