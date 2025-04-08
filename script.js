// 1. Introduction to JWT
// JWT (JSON Web Token) is a compact, URL-safe token used to securely transmit information between parties. It's widely used in full-stack development for:

//     Authentication (e.g., user login sessions),
//     Authorization (e.g., role-based access),
//     Stateless identity verification (no need to store sessions on the server).
//     A JWT has 3 parts:
//     HEADER.PAYLOAD.SIGNATURE

// 2. Encryption Methods for JWT
// JWT itself uses a signature for validation (HMAC, RSA, etc.), not encryption by default.
// If you want to encrypt the payload for extra security, common methods include:

//     AES (Advanced Encryption Standard) – symmetric key encryption
//     RSA – public/private key encryption
//     Base64 encoding – not encryption, but often used in simple lab simulations

const jwt = require('jsonwebtoken');
const SECRET = 'supersecret'; // JWT signing key

const encrypt = (payload) => {
  const str = JSON.stringify(payload);
  const encrypted = Buffer.from(str).toString('base64');
  const token = jwt.sign({ data: encrypted }, SECRET);
  return token;
};

const decrypt = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    const decrypted = Buffer.from(decoded.data, 'base64').toString('utf8');
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Failed to decrypt:', e.message);
    return null;
  }
};

const token = encrypt({ msg: 'Hello World' });
const result = decrypt(token);

if (result && result.msg === 'Hello World') {
  console.log('Success');
} else {
  console.log('Failed');
}

module.exports = {
  encrypt,
  decrypt,
};