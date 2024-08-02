const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(`Token payload: ${JSON.stringify(payload)}`);
  } catch (error) {
    console.error('Token verification error:', error);
  }
}

// Replace with an actual token for testing
const testToken = '';
verify(testToken);
