import auth0 from 'auth0-js'
import jsonwebtoken from 'jsonwebtoken'

let config

// If testing, fake the options
if (global.process && process.env.NODE_ENV === 'test') {
  config = {
    domain: 'domain',
    clientID: 'clientID',
    redirectUri: 'redirectUri',
    audience: 'audience',
    responseType: 'responseType',
    scope: 'scope'
  }
} else {
  // If not, use the correct options
  config = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: process.env.AUTH0_RESPONSE_TYPE,
    scope: process.env.AUTH0_SCOPE
  }
}

export default class Auth {
  auth0 = new auth0.WebAuth(config)

  constructor () {
    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const decodedResult = jsonwebtoken.decode(authResult.idToken)
          const loginsCount = decodedResult['https://bhefty-bookswap-project.herokuapp.com/loginsCount']
          const userId = decodedResult.sub
          const name = decodedResult.name || decodedResult.nickname
          const email = decodedResult.email
          const location = null
          const result = {
            ...authResult,
            loginsCount,
            userId,
            name,
            email,
            location
          }
          resolve(result)
        } else if (err) {
          reject(err)
        }
      })
    })
  }
}
