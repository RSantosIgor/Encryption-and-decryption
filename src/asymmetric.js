const crypto = require('crypto');

function getKeyPair() {
    try {
        return crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: 'spki', format: 'pem' },
          privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });

    } catch (error) {
        console.error(error);
        return null;
      }
}

/**GetCertificate*/
function generateSignature(msg, privateKey) {
    const signature = crypto.sign("sha256", Buffer.from(msg), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      });
      return signature
}

/**ValidMessage*/
function verify(msg, signature, publicKey) {
    return crypto.verify(
        "sha256",
        Buffer.from(msg),
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        signature
      );
}

module.exports = {getKeyPair, generateSignature, verify}