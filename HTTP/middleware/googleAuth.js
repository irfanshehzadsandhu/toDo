const { google } = require("googleapis");
const gaxios = require('gaxios');
const { googleCredentials } = require("../../App/Infrastructure/config");

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleCredentials.googleClientId,
    googleCredentials.googleClientSecret,
    googleCredentials.redirect
  );
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}
/**
 * Create the google url to be sent to the client.
 */
exports.googleUrl = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
exports.getGoogleAccountFromCode = async code => {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  gaxios.instance.defaults = {
    baseURL: 'https://www.googleapis.com',
    headers: {
      Authorization: "Bearer "+auth.credentials.access_token
    }
  }
  const userinfo = await gaxios.request({url: '/oauth2/v3/userinfo'});
  return {name: userinfo.data.name,email: userinfo.data.email,password: userinfo.data.sub}
};
