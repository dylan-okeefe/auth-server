const express = require('express'),
      router = express.Router()

router.use(express.static(__dirname + './../'))

router.use('/api', require('./auth-interactions') )


module.exports = router
