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

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const query = function (queryStr, queryParams) {
  return pool.query(queryStr, queryParams)
  .catch(err => console.log(`custom query: ${Error(err)}`));
}

const getUserWithEmail = function(email) {
  return query(
  `SELECT *
  FROM users
  WHERE email = $1;`
  , [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(
    `SELECT *
    FROM users
    WHERE id = $1;`
    , [id])
    .then(res => res.rows[0])
    .catch(err => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(
  `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  , [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => null)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(
  `SELECT r.*, p.*, AVG(pr.rating) AS average_rating
  FROM reservations r
    JOIN properties p ON p.id = r.property_id
    JOIN property_reviews pr ON pr.property_id = p.id
  WHERE 
    r.guest_id = $1
    AND r.end_date < now()::date
  GROUP BY p.id, r.id
  ORDER BY r.start_date
  LIMIT $2;`
  , [guest_id, limit])
  .then(res => res.rows)
  .catch(err => null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT p.*, avg(pr.rating) as average_rating
  FROM properties p
  LEFT JOIN property_reviews pr ON p.id = pr.property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    let len = queryParams.length;
    let appendStr = len === 1 ? `\n WHERE` : '\n AND';
    queryString += appendStr + ` p.city LIKE $${len}`;
  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    let len = queryParams.length;
    let appendStr = len === 1 ? `\n WHERE` : `\n  AND`;
    queryString += appendStr + ` p.owner_id = $${len}`;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night));
    let len = queryParams.length;
    let appendStr = len === 1 ? `\n WHERE` : `\n AND`;
    queryString += appendStr + ` p.cost_per_night >= $${len}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night));
    let len = queryParams.length;
    let appendStr = len === 1 ?  `\n  WHERE` : `\n  AND`;
    queryString += appendStr + ` p.cost_per_night <= $${len}`;
  }

  queryString += `\n  GROUP BY p.id`  

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    let len = queryParams.length;
    queryString += `\nHAVING avg(pr.rating) >=  $${len}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.log(Error(err)));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryParams  = [];
  let attributes = [];
  for (const key in property) {
    if (['cost_per_night', 'parking_spaces', 'number_of_bathrooms', 'number_of_bedrooms'].includes(key)) {
      queryParams.push(Number(property[key]));
    } else {
      queryParams.push(property[key]);
    }
    attributes.push(key);
  }

  let queryString = `
    INSERT INTO properties 
    (${attributes})
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows[0])
  .catch(err => console.log(Error(err)));
}
exports.addProperty = addProperty;
