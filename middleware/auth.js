const jwt = require('jsonwebtoken')
   bcrypt = require('bcrypt'),
   config = require('../configuration')

let  User = require( '../models/user' ),
jwtSecret = config.get('jwtSecret')

// setup the service
let AuthService = {}

// signup
// expects username, email, password

AuthService.signup = (req, res, next) => {

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
// expects email, password

AuthService.login = ( req, res, next ) => {

  let    email = req.body.email,
      password = req.body.password

  User.findOne( { where: { email: email } } )
      .then( ( user ) => {
        if( !user ){
          // do a thing
          return next()
        }

        let validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ){

          // throw an error!!!!!

        }

        req.success = true;

        req.user = { user: email }

        next()

      } )

}

// sign
// sign a jwt for user

AuthService.sign = ( req, res, next ) => {

  let token = jwt.sign( req.user, jwtSecret, { expiresIn: '7d' } )

  req.auth_token_encoded = token

  res.cookie( 'auth', token )

  next()

}

// verify
// verifies jwt in cookie for all private requests

AuthService.verify = ( req, res, next ) => {

	jwt.verify( req.cookies.auth, jwtSecret, ( err, decoded ) => {

	  if ( err ) {

	  	res.status( 401 );

	  	return next( err );

	  }

	  req.auth_token_decoded = decoded;

	  next();

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
