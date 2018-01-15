const express = require('express'),
      router = express.Router()

router.use('/', require('./auth-interactions') )

router.use('/api', require('./api'))

module.exports = router
