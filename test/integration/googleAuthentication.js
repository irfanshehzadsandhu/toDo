const expect = require("chai").expect;
//http://localhost:3000/api/v1/session/googleAuth?code=4/yAG87jTH6SuBO0Npq5AqlWhZovD92cbYmDjpwqBUWSJdSXPmZhOksKsrh2foaEuVR6pjA0fRc9m9sJHxN6PvP2g&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&hd=carbonteq.com&prompt=consent
const app = require("../../HTTP/bootstrap/app");
const request = require('supertest')(app);

describe("Google Authentication", () => {
  it("Should save information sent from google api", () => {
    request.get("/api/v1/session/googleAuth?code=4/yAG87jTH6SuBO0Npq5AqlWhZovD92cbYmDjpwqBUWSJdSXPmZhOksKsrh2foaEuVR6pjA0fRc9m9sJHxN6PvP2g&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&hd=carbonteq.com&prompt=consent")
      .end((err, response) => {
        expect(response.statusCode).to.eq(200);
      });
  });
});