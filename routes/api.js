const express = require('express'),
      router = express.Router()


let AuthService = require('../middleware/auth')


// router.use( AuthService.parse ); 	// Parse JWT from Request

router.use( AuthService.verify ); 	// Verify JWT

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
