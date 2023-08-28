function encryptionOrDecryption(msg, key){
  const message = msg.split('');
  const msgEncrypted = [];
  for(const l of message) {
      msgEncrypted.push(isInAlphabet(l, key));
  }
  return msgEncrypted.join('');
} 

function isInAlphabet(caracter, key) {
  return key.indexOf(caracter) > -1 ? swapLetters(caracter, key): caracter;
}

function swapLetters(caracter, key) {
  let index = key.indexOf(caracter);
  return key[62 - (index + 1)];
}

module.exports = {encryptionOrDecryption};