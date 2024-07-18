// middleware/verifyGoogleToken.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not provided' });
  }
  try {
    console.log("Token received:", token); // Log the token received
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.user = {
      googleId: payload['sub'],
      name: payload['name'],
      email: payload['email'],
      picture: payload['picture'],
    };
    console.log("User authenticated:", req.user); // Log the authenticated user
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Log the error
    res.status(401).json({ message: 'Unauthorized, token verification failed' });
  }
}

module.exports = verifyGoogleToken