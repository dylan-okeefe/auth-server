const express = require('express'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      config = require('./configuration')

let app = express()

// set the application port
app.set( 'port', config.get('port') )

// set morgan to log info about our requests for development use
app.use( morgan('dev') )

// set express to use cookie-parser
app.use(cookieParser())

// initialize body-parser to parse incoming parameters requests to req.body
app.use( bodyParser.json( { limit: '10mb' } ) ) // for parsing application/json
app.use( bodyParser.urlencoded( { limit: '10mb', extended: true } ) ) // for parsing application/x-www-form-urlencoded


// set up routing
app.use( require( './routes/index' ) )


// start the express server
let server = app.listen( app.get( 'port' ), () => console.log( 'App started on port ' + app.get('port') ) )
