const layout = require('../layout')
const model = require("../database/model.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (!sid) {
    const html2 = `
      <h1><img class='logo' src='logo.png' alt="checkin logo"></h1>
        <a href="/sign-up">Sign up</a>
        <br>
        <a href="/log-in">Log in</a>
      `;
      response.send(layout('Checkin', html2))
  } else {
    model.getUserSessionData(sid).then((session) => {
      const html = `
        <h1>Hello ${session.data.user.name}!</h1>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
        <a href='/posts'>Go to posts</a>
      `;
      response.send(layout('Checkin', html))
    })
  }
}

module.exports = { get }
