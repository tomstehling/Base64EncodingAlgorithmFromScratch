function encodeToBase64(a) {
  let binary = "";
  let splitDataStream = [];
  let base64 = [];
  let base64Characters = "";
  for (let i = 0; i < a.length; i++) {
    let CharacterInBinary = a[i].charCodeAt(0).toString(2);
    if (CharacterInBinary.length == 6) {
      binary += "00" + CharacterInBinary;
    } else if (CharacterInBinary.length == 7) {
      binary += "0" + CharacterInBinary;
    }

    if (binary.length % 24 === 0) {
      splitDataStream.push(binary);
      binary = "";
    }
  }
  splitDataStream.push(binary);

  for (let i of splitDataStream) {
    while (i.length != 24) {
      i += "0";
    }

    sixBitPieces = [
      i.slice(0, 6),
      i.slice(6, 12),
      i.slice(12, 18),
      i.slice(18, 24),
    ];

    for (let sequence of sixBitPieces) {
      base64.push(parseInt(sequence, 2));
    }
  }
  for (integer of base64) {
    if (integer > 0 && integer < 26) {
      base64Characters += String.fromCharCode(integer + 65);
    } else if (integer > 25 && integer < 52) {
      base64Characters += String.fromCharCode(integer + 71);
    } else if (integer > 51 && integer < 63) {
      base64Characters += String.fromCharCode(integer - 4);
    } else if (integer == 52) {
      base64Characters += String.fromCharCode(43);
    } else if (integer == 53) {
      base64Characters += String.fromCharCode(47);
    } else {
      base64Characters += String.fromCharCode(61);
    }
  }

  return base64Characters;
}

const text = "Hello, World!";
const base64 = encodeToBase64(text);

if (base64 === btoa(text)) console.log("GESCHAFFT!");
console.log(encodeToBase64(text));
console.log(btoa(text));
