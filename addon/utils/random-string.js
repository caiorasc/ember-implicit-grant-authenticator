export function randomString(length) {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  let result = [];
  window.crypto
    .getRandomValues(new Uint8Array(length))
    .forEach(function (c) {
      result.push(charset[c % charset.length]);
    });
  return result.join('');
}

export default randomString;