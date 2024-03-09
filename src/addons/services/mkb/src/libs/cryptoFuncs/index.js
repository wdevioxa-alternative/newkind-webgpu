// GENERATING CODE VERIFIER
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  function generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
  }
  
  // GENERATING CODE CHALLENGE FROM VERIFIER
  function sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }
  
  function base64urlencode(a) {
    var str = '';
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  async function generateCodeChallengeFromVerifier(v) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }
  export async function getCodeChallenge() {
    let code_verifier = generateCodeVerifier();
    let code_challenge = await generateCodeChallengeFromVerifier(code_verifier);
    return { code_verifier, code_challenge };
  }
  
  