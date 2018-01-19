const express = require('express'),
      router  = express.Router()

router.use('/', require('./auth-interactions') )

// place any protected/private routes inside the api.js file
router.use('/api', require('./api') )

module.exports = router
