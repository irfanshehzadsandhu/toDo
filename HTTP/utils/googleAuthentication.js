const { google } = require("googleapis");
const gaxios = require('gaxios');
const { googleCredentials } = require("../../App/Infrastructure/config");

class GoogleAuthentication {
  constructor(){
    this.auth = new google.auth.OAuth2(
      googleCredentials.googleClientId,
      googleCredentials.googleClientSecret,
      googleCredentials.redirect
    );
    this.defaultScope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ];
  }

  getConnectionUrl() {
    return this.auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: this.defaultScope
    });
  }

  async getGoogleAccountFromCode(code){
    const data = await this.auth.getToken(code);
    const tokens = data.tokens;
    this.auth.setCredentials(tokens);
    gaxios.instance.defaults = {
      baseURL: 'https://www.googleapis.com',
      headers: {
        Authorization: "Bearer "+ this.auth.credentials.access_token
      }
    }
    const userinfo = await gaxios.request({url: '/oauth2/v3/userinfo'});
    return { name: userinfo.data.name,email: userinfo.data.email,password: userinfo.data.sub }
  }

}
module.exports = GoogleAuthentication;