const assert = require('assert');
const symmetric  =  require('../src/symmetric');
const asymmetric = require('../src/asymmetric');

describe('Cryptography', function () {
    const message = 'Hello World. This is a test message.';

    describe('Symmetric', function () {
        const mainKey = '1H3mkTRhb0lBM2Ziq6eU7GD4OcudVLS5PxC8sI9nWKvQEjgYNXAyfwrtpFzJoa';
        const secondKey = '4SLBNtzRPAvEedl70Y2JhIiOmgwfa8Hc5KsqpGkxXQVZjU6DMyuTnCWoFb9r31';

      it('Encrypted message must be different from the original message', function () {
        const messageEncrypted = symmetric.encryptionOrDecryption(message, mainKey);
        assert.notEqual(message, messageEncrypted);
      });

      it('Decrypted message must be same as original', function () {
        const messageEncrypted = symmetric.encryptionOrDecryption(message, mainKey);
        const originalMessage = symmetric.encryptionOrDecryption(messageEncrypted, mainKey);
        assert.equal(originalMessage, message);
      });

      it('Message encrypted by different keys must not be the same', function () {
        const messageEncryptedFromMainKey = symmetric.encryptionOrDecryption(message, mainKey);
        const messageEncryptedFromSecondKey = symmetric.encryptionOrDecryption(message, secondKey);
        assert.notEqual(messageEncryptedFromMainKey, messageEncryptedFromSecondKey);
      });

      it('Only the key that encrypted the message can decrypt it.', function () {
        const messageEncrypted = symmetric.encryptionOrDecryption(message, mainKey);
        const messageDecrypted = symmetric.encryptionOrDecryption(messageEncrypted, secondKey);
        assert.notEqual(messageDecrypted, message);
      });
    });
    describe('Asymmetric', function () {
        const pairKeys = asymmetric.getKeyPair();

        it('Person A sends a message to person B and the message is intact', function () {
            const signature = asymmetric.generateSignature(message, pairKeys.privateKey);
            const isValid = asymmetric.verify(message, signature, pairKeys.publicKey);
            assert.ok(isValid);
        });

        it('Person A sends a message to person B and the message has been modified', function () {
            const messageModified = 'Not' + message;
            const signature = asymmetric.generateSignature(messageModified, pairKeys.privateKey);
            const isValid = asymmetric.verify(message, signature, pairKeys.publicKey);
            assert.ok(!isValid);
        });
    });
  })