const express = require( 'express' ),
	     fs 		= require( 'fs' ),
	     router = express.Router()

let AuthService = require('../middleware/auth')

router
  .route('/signup')
  .post(

    AuthService.signup,

    (req, res) => {

      return res.json( req.user_success )

    }
  )

router
  .route('/login')
  .post(

    AuthService.login,

    (req, res) => {

    }

  )

module.exports = router
