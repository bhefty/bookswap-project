const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

module.exports = (app) => {
  const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_REDIRECT_URI
  }, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile)
  })

  passport.use(strategy)

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  app.use(passport.initialize())
  app.use(passport.session())

  return app
}
