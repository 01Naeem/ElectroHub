const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })  // <-- forces account selection every time 
);

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to client
    res.redirect(process.env.CLIENT_URL);
  }
);

// @desc    Get current user
// @route   GET /api/auth/current_user
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;