## Node Auth Server with JWT

A lightweight express REST API utilizing bcrypt, jsonwebtokens, and cookies for
secure authorization.

### Background
I choose the Auth Server because I'm more comfortable with backend and
have worked on applications utilizing JSON web tokens for authentication before,
but never built one myself and was excited at the prospect. I had the server
respond to incorrect logins and deal with errors by responding with a 200 code
and a payload including a success boolean and error data instead of a 404
because I had imagined this being used with a React front end.

### Prerequisites:
You must have Node and NPM installed on your machine, along with Postgres.
These instructions are for use on unix based operating systems only.

The server start command requires nodemon so make sure you have that installed
globally.

`$ npm install -g nodemon`

Install the dependencies:

`$ npm install`

Create two databases, named "auth-server" and "auth-server-tester".
(You can name them whatever you want but make sure to change the values in your
config files. I've provided an example config file at /etc/.example.config.json
file, copy the file and make any changes needed for development and rename to
/etc/.development.config.json).

`$psql -U postgres -c 'CREATE DATABASE "auth-server"'`

`$psql -U postgres -c 'CREATE DATABASE "auth-server-tester"'`

### Unit tests:

Run the unit tests with

`$ npm run test`

### Using the server:

Run the server with

`$ npm run start:dev`

To create a new user, send a POST request to '/signup' with a payload that looks
as such:

```
{
  "username": "a_user",
  "email": "user@test.com",
  "password": "password"
}
```

It will respond with:

```
{
  "success": bool,
  "message": string
}
```

Login by POSTing to the '/login' endpoint with:

```
{
  "email": "user@test.com",
  "password": "password"
}
```

It will return with:

```
{
  "success": bool,
  "auth_token": encoded JWT or null,
  "message": string if error, omitted if success
}
```

To log out send a GET request to '/logout', it will check for the presence of a
valid token sent with a cookie and then destroy the cookie.

Any routes created in the /routes/api.js file will require a cookie with a valid
token to be passed to access.

### External Packages:

[bcrypt](https://www.npmjs.com/package/bcrypt): "^1.0.3", Encrypting passwords

[body-parser](https://www.npmjs.com/package/body-parser): "^1.18.2", Parsing requests

[cookie-parser](https://www.npmjs.com/package/cookie-parser): "^1.4.3", Parsing requests

[express](https://www.npmjs.com/package/express): "^4.16.2", Server framework

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): "^8.1.0", Signing and encrypting web tokens

[nconf](https://www.npmjs.com/package/nconf): "^0.10.0", Preferred config package

[pg](https://www.npmjs.com/package/pg): "^7.4.1", Package for PostgreSQL

[sequelize](https://www.npmjs.com/package/sequelize): "^4.31.2", SQL-based ORM

[chai](https://www.npmjs.com/package/chai): "^4.1.2", Testing

[chai-http](https://github.com/chaijs/chai-http): "^3.0.0", Testing

[mocha](https://www.npmjs.com/package/mocha): "^4.1.0" Testing
