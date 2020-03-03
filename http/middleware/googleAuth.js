const { google } = require("googleapis");
const { googleCredentials } = require("../../config");

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
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
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
function getGooglePlusApi(auth) {
  return google.plus({ version: "v1", auth });
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
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: "me" });
  const userGoogleId = me.data.id;
  const userGoogleEmail =
    me.data.emails && me.data.emails.length && me.data.emails[0].value;
  return {
    userGoogleId: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens
  };
};
