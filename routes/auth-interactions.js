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

    ( req, res ) => {

      return res.json( {
                        success: req.success,
                        auth_token: req.auth_token_encoded,
												message: req.message
                       } )

    }

  )

router
	.route( '/validate' )
	.get(

		AuthService.validate,

		( req, res ) => {

			return res.json( {
												validated: req.valid
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
