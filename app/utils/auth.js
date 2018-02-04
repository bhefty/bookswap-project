import auth0 from 'auth0-js'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'bhefty.auth0.com',
    clientID: 'V6Suys2WmYNDVMjwXRDGIT1SPc0Rf48J',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://bhefty.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

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
          resolve(authResult)
        } else if (err) {
          reject(err)
        }
      })
    })
  }
}
