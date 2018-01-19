const express = require('express'),
      router = express.Router()

router.use('/', require('./auth-interactions') )


module.exports = router
