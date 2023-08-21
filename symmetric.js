const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

export function encryptionOrDecryption(message){
  const msg = message.split('');
  const msgEncrypted = [];
  for(const l of msg) {
      msgEncrypted.push(isInAlphabet(l));
  }
  return msgEncrypted.join('');
} 

function isInAlphabet(caracter) {
  return alphabet.indexOf(caracter) > -1 ? swapLetters(caracter): caracter;
}

function swapLetters(letter) {
  let index = alphabet.indexOf(letter);
  return alphabet[62 - (index + 1)];
}