const express = require('express'),
      router  = express.Router()


let AuthService = require('../middleware/auth')

router.use( AuthService.verify ); 	// Verify JWT

// use this file for any routes that you want protected

// example
// router
//     .route('/test')
//     .get(
//
//       AuthService.test,
//
//       (req, res) => {
//
//         return res.json({ test: "test"})

//       }
//     )

module.exports = router
