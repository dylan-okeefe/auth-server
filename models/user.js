const Sequelize = require( 'sequelize' ),
      bcrypt    = require( 'bcrypt' ),
      Op        = Sequelize.Op

// create a sequelize instance with our local postgres database information
let sequelize = new Sequelize( 'postgres://postgres@localhost:5432/auth-server', { operatorsAliases: false } )

// setup User model and it's fields and behaviors
let User = sequelize.define( 'users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: ( user ) => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync( user.password, salt )
    }
  },
  instanceMethods: {
    validPassword: ( password ) => {
      return bcrypt.compareSync( password, this.password )
    }
  }
} )

// create all the defined tables in the specified database
sequelize.sync()
         .then( () => console.log( 'users table has been successfully created, if one doesn\'t exits') )
         .catch( error => console.log( 'This error occured', error ) )

// export User model for use in other files
module.exports = User
