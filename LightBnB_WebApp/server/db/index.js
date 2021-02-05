const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'vagrant',
  password: '123',
  database: 'lightbnb' 
});

// module.exports = {
//   getUserWithEmail: 

//   ,
//   getUserWIthId:
//   ,
//   addUser:
//   ,
//   getAllReservations: 
//   ,
//   getAllProperties:
//   ,
//   addProperty: 

// }