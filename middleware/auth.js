const jwt = require('jsonwebtoken')
   bcrypt = require('bcrypt'),
   config = require('../configuration')

let  User = require( '../models/user' ),
jwtSecret = config.get('jwtSecret')

// setup the service
let AuthService = {}

// signup
// expects username, email, password in request

AuthService.signup = ( req, res, next ) => {

  User.create( {
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
// expects email, password in request

AuthService.login = ( req, res, next ) => {

  let    email = req.body.email,
      password = req.body.password

  User.findOne( { where: { email: email } } )
      .then( ( user ) => {
        if( !user ){

          req.success = false
          req.auth_token_encoded = null
          req.message = 'Incorrect email or password.'

          return next()
        }

        let validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ){

          req.success = false
          req.auth_token_encoded = null
          req.message = 'Incorrect email or password.'

          return next()

        }

        AuthService.sign( { user: email } )
                   .then( token => {

                     req.success = true

                     req.auth_token_encoded = token

                     res.cookie( 'auth', token )

                     next()

                   } )
                   .catch( err => {

                     req.success = false

                     req.auth_token_encoded = null

                     req.message = "Error: " + err

                     next()

                   } )

      } )

}

// sign
// sign a jwt for user
// expects user information

AuthService.sign = ( user ) => {

  return new Promise( ( resolve, reject ) => {

    let token = jwt.sign( user, jwtSecret, { expiresIn: '7d' } )

    return resolve( token )

  } )

}

// verify
// middleware verifies jwt in cookie for all private requests

AuthService.verify = ( req, res, next ) => {

	jwt.verify( req.cookies.auth, jwtSecret, ( err, decoded ) => {

	  if ( err ) {

	  	res.status( 401 )

	  	return next( err )

	  }

	  req.auth_token_decoded = decoded

    req.valid = true

	  next()

	} );

};

// validate
// validate jwt in cookie for front end check

AuthService.validate = ( req, res, next ) => {

	jwt.verify( req.cookies.auth, jwtSecret, ( err, decoded ) => {

	  if ( err ) {

	  	req.valid = false

	  	return next()

	  }

	  req.auth_token_decoded = decoded;

    req.valid = true;

	  next()

	} );

};

// logout
// deletes the cookie

AuthService.logout = ( req, res, next ) => {

  res.clearCookie('auth')

  next();

}

// export the service
module.exports = AuthService
