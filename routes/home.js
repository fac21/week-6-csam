const layout = require('../layout')

function get(request, response) {
  const html = `
  <h1><img class='logo' src='logo.png' alt="checkin logo"></h1>
    <a href="/sign-up">Sign up</a>
    <br>
    <a href="/log-in">Log in</a>
  `;
  response.send(layout('Checkin', html))

}

module.exports = { get }
