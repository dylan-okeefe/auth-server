const jwt = require('jsonwebtoken')
      config = require('../configuration')

let      User = require( '../models/user' )

// setup the service

let AuthService = {}

let jwtSecret = config.get('jwtSecret')

// signup
// expects username, email, password

AuthService.signup = (req, res, next) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  } )
  .then( user => {
    req.user_success = { success: true, message: "Confirmation sent to " + user.dataValues.email }
    return next()
  } )
  .catch( error => {
    req.user_success = { success: false, message: "Signup failed, " + error }
    return next()
  } )

}

// login
// expects email, password

AuthService.login = (req, res, next) => {

  let email = req.body.email,
      password = req.body.password

  User.findOne( where: { email: email } )
      .then((user) => {
        if(!user){
          // do a thing
          return next()
        } else if (!user.validPassword( password ))
      })
}

// export the service
module.exports = AuthService
