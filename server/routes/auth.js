const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/login',
  passport.authenticate('auth0', {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: process.env.AUTH0_RESPONSE_TYPE,
    scope: process.env.AUTH0_SCOPE
  }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/user')
  }
)

module.exports = router
