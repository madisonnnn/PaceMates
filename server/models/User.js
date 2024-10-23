const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Think of it more like a formatter function. It is used by each of the User 
  // static methods to hide the hashed password of users before sending user data 
  // to the client. Since we want to keep the #passwordHash property private, we 
  // provide the isValidPassword instance method as a way to indirectly access it.
  constructor({ id, firstName,lastName,email, password_hash }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email
    this.#passwordHash = password_hash;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password. Can be used by controllers.
  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );
  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    try{
      const query = `SELECT * FROM users WHERE id = ?`;
    const {rows:[userData]} = await knex.raw(query, [id]);
    return userData ? new User(userData) : null;
    } catch (error){
      throw new Error(`Unable to get user: ${error.message}`) 
    }
    
  }


  // Same as above but uses the username to find the user
  static async findByEmail(email) {
    try{
      const query = `SELECT * FROM users WHERE email = ?`;
    const {rows:[userData]} = await knex.raw(query, [email]);
    return userData ? new User(userData) : null;
    } catch (error){
      throw new Error(`Unable to get user: ${error.message}`) 
    }
    
  }

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash. 
  static async create(firstName,lastName,email, password) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await authUtils.hashPassword(password);

    const query = `INSERT INTO users (first_name, last_name, email, password_hash)
      VALUES (?, ?, ?, ?) RETURNING *`;
    const result = await knex.raw(query, [firstName, lastName, email, passwordHash]);
    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash. 
  static async update(id, firstName, lastName, email) {
    const query = `
      UPDATE users
      SET first_name=?
      SET last_name=?
      SET email=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [firstName, lastName,email, id])
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  };

  static async deleteAll() {
    return knex('users').del()
  }
}

module.exports = User;
