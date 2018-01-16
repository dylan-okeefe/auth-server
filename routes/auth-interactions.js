const   express = require( 'express' ),
	           fs = require( 'fs' ),
	       router = express.Router()

let AuthService = require( '../middleware/auth' )

router
  .route( '/signup' )
  .post(

    AuthService.signup,

    ( req, res ) => {

      return res.json( req.user_success )

    }
  )

router
  .route( '/login' )
  .post(

    AuthService.login,
    AuthService.sign,

    ( req, res ) => {

      return res.json( {
                        success: req.success,
                        auth_token: req.auth_token_encoded
                       } )

    }

  )

router
	.use(AuthService.verify)
  .route( '/logout' )
  .get(

    AuthService.logout,

    ( req, res ) => {

      return res.json( { success: true } )

    }
  )

module.exports = router
