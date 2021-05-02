const db = require("./connection.js");

function createUser(email, hash, name) {
  const INSERT_USER = `
  INSERT INTO users (email, password, name) VALUES($1,$2,$3)
  RETURNING id, email, name
  `;
  return db
    .query(INSERT_USER, [email, hash, name])
    .then((result) => result.rows[0]);
}

// step 1 for login - this function is going to fetch user from database
function getUser(email) {
  const SELECT_USER = `
      SELECT id, email, password, name FROM users WHERE email=$1
    `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

// step 2 for login - create session id, data and store in db
function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

// save post in db
function createPost(user_id, text_content) {
  const INSERT_POST = `
    INSERT INTO posts ( user_id, text_content, created_at) VALUES
  ($1,  $2, (SELECT CURRENT_TIMESTAMP))
    `;
  return db.query(INSERT_POST, [user_id, text_content]);
}


function getPostByID(postId){
  const SELECT_POST = "SELECT * FROM posts WHERE id = $1 "
  return db.query(SELECT_POST, [postId]);
}

function getUserSessionData(sid) {
  const SELECT_SESSION_DATA = `
        SELECT data FROM sessions WHERE sid = $1
    `;
  return db.query(SELECT_SESSION_DATA, [sid]).then((result) => result.rows[0]);
}

function deletePost(postId) {
  const DELETE_POST = "DELETE FROM posts WHERE id = $1 ";
  return db.query(DELETE_POST, [postId]);
}

function deleteSession(sid) {
  const DELETE_SESSION = `DELETE FROM sessions WHERE sid = $1`;
  return db.query(DELETE_SESSION, [sid])
}

module.exports = {
  createUser,
  getUser,
  createSession,
  createPost,
  getUserSessionData,
  deletePost,
  getPostByID,
  deleteSession,
};
