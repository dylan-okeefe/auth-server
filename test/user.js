// set the env variable to test
process.env.NODE_ENV = 'test'

let User = require('../models/user')

let chai = require('chai'),
   bcrypt = require('bcrypt'),
   jwt = require('jsonwebtoken'),
   chaiHttp = require('chai-http'),
   server = require('../app'),
   config = require('../configuration'),
   testSecret = config.get('jwtSecret'),
   expect = chai.expect,
   should = chai.should()

let testUser = {
   username: "testUser",
   email: "test@test.com",
   password: "password"
}

let loginData = {
  email: "test@test.com",
  password: "password"
}

chai.use(chaiHttp)

// check that signup works
describe('Users', () => {
  before((done) => {
    // empty database before test
    User.destroy( { where: {}, truncate: true } )
        .then( affectedRows => {
          done()
        } )
  } )

  // test that signup works as expected
  describe('/signup user', () => {
    it('it should create a new user and return a success', (done) => {
      chai.request(server)
          .post('/signup')
          .send(testUser)
          .end( ( err, res ) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('success')
            res.body.should.have.property('message')
            res.body.should.have.property('success').eql(true)
            done()
          } )
    } )

    // test that passwords are properly encrypted
    it('it should encrypt the password correctly', (done) => {
      User.findOne({ where: { email: testUser.email } } )
          .then( user => {

            let passwordEncrypted = bcrypt.compareSync( testUser.password, user.password )

            expect(passwordEncrypted).to.equal(true);

            done()
          } )
    } )


  } )

  describe('/login user', () => {

    let res

    before( (done) => {
      chai.request(server)
      .post('/login')
      .send(loginData)
      .end( ( err, response ) => {

        res = response
        done()
      } )
    } )

    it('it should successfully log in', (done) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('success').eql(true)
        done()
    } )

    it('it should return a cookie containing a JSON web token', (done) => {
        res.should.have.cookie('auth')
        done()
    } )

    it('it should sign and encrypt the JWT properly', (done) => {
      jwt.verify(res.body.auth_token, testSecret, ( err, decoded ) => {

        expect(decoded.user).to.equal(testUser.email)
        done()
      } )
    } )

  } )

  describe('/logout user', () => {

    it('it should only work if user is already logged in and sends token', (done) => {
      chai.request(server)
          .get('/logout')
          .end( (err, res ) => {
            res.should.have.status(401)
            done()
          } )
    } )

    it('it should destroy the cookie ending the user\'s session', (done) => {
      let agent = chai.request.agent(server)

      agent
          .post('/login')
          .send(loginData)
          .then( res => {

            res.should.have.cookie('auth')
            agent.get('/logout')
                 .then( res => {

                   res.should.have.status(200)
                   expect(agent).to.not.have.cookie('auth')
                   done()
                 } )
          } )
    } )

  } )

} )
