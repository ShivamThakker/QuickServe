const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    console.log("No token provided"); // Debug: Log if no token is provided
    return res.status(401).json({ message: 'Unauthorized, token not provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    req.body.googleId = payload.sub;
    req.body.name = payload.name;
    req.body.email = payload.email;
    req.body.picture = payload.picture;
    // localStorage.setItem("user",JSON.stringify(payload));
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Debug: Log the error if verification fails
    res.status(401).json({ message: 'Unauthorized, token verification failed' });
  }
};

module.exports = verifyGoogleToken;
