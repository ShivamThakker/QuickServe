// // // middlewares/verifyGoogleToken.js
// // const { OAuth2Client } = require('google-auth-library');
// // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // const verifyGoogleToken = async (req, res, next) => {
// //   const token = req.body.token;
// //   if (!token) {
// //     return res.status(401).json({ message: 'Unauthorized, token not provided' });
// //   }

// //   try {
// //     const ticket = await client.verifyIdToken({
// //       idToken: token,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     req.body.googleId = payload.sub;
// //     req.body.name = payload.name;
// //     req.body.email = payload.email;
// //     req.body.picture = payload.picture;
// //     next();
// //   } catch (error) {
// //     console.error('Token verification error:', error);
// //     res.status(401).json({ message: 'Unauthorized, token verification failed' });
// //   }
// // };

// // module.exports = verifyGoogleToken;

// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const verifyGoogleToken = async (req, res, next) => {
//   const token = req.body.token;

//   // Check if the token is present in the request
//   if (!token) {
//     console.error('Token not provided in the request.');
//     return res.status(401).json({ message: 'Unauthorized, token not provided' });
//   }

//   console.log('Token received:', token); // Debug: Log the received token

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     // Debug: Log the payload after verification
//     const payload = ticket.getPayload();
//     console.log('Token payload:', payload);

//     req.body.googleId = payload.sub;
//     req.body.email = payload.email;
//     req.body.name = payload.name || 'No Name Provided'; // Use a default if name is not present

//     next();
//   } catch (error) {
//     // Log the error details for debugging
//     console.error('Token verification error:', error);
//     res.status(401).json({ message: 'Unauthorized, token verification failed' });
//   }
// };

// module.exports = verifyGoogleToken;

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
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Debug: Log the error if verification fails
    res.status(401).json({ message: 'Unauthorized, token verification failed' });
  }
};

module.exports = verifyGoogleToken;
