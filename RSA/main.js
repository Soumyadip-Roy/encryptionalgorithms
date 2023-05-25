const messagebox = document.querySelector(".message-box");
const encrypt_mssge = document.querySelector(".encrypted_message");
const encryptKey = document.querySelectorAll(".encryptKey input");
const decryptKey = document.querySelectorAll(".decryptKey input");
const phone1 = document.querySelector(".chats__phone1");
const phone2 = document.querySelector(".chats__phone2");
const phone3 = document.querySelector(".chats__phone3");

// Utility functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modInverse(e, phi) {
  let [x, y, u, v] = [0, 1, 1, 0];
  while (e !== 0) {
    [x, y, u, v] = [
      u,
      v,
      x - Math.floor(phi / e) * u,
      y - Math.floor(phi / e) * v,
    ];
    [e, phi] = [phi % e, e];
  }
  return x < 0 ? x + phi : x;
}

function bigMod(base, exponent, modulus) {
  if (modulus === 1) return 0;

  let result = 1;
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }

  return result;
}

function generateKeyPair() {
  while (true) {
    let p = 17,q = 1009;
    const n = p * q;
    const phi_n = (p - 1) * (q - 1);

    let e;
    while (true) {
      e = getRandomInt(2, phi_n);
      if (gcd(e, phi_n) === 1) {
        break;
      }
    }
    const d = modInverse(e, phi_n) % phi_n;
    console.log(d);

    if(d>0)return { publicKey: [e, n], privateKey: [d, n] };
  }
}

let messageText = [];

const senderSend = (mssge) => {
  let senderCht = document.createElement("div");
  let senderMssg = document.createElement("div");
  senderCht.classList.add("sender", "chat", "chat-sent");
  senderMssg.classList.add("sender", "message-sent");
  senderMssg.innerText = mssge;
  senderCht.appendChild(senderMssg);
  phone1.appendChild(senderCht);
};

const hckrReceive = (mssge) => {
  let text = "";
  mssge.map((a) => {
    text += a;
  });
  let hckrCht = document.createElement("div");
  let hckrMssg = document.createElement("div");
  hckrCht.classList.add("sender", "chat", "chat-sent");
  hckrMssg.classList.add("sender", "message-sent");
  hckrMssg.innerText = text;
  hckrCht.appendChild(hckrMssg);
  phone2.appendChild(hckrCht);
};

const recieverReceive = (mssge) => {
  let recieverCht = document.createElement("div");
  let recieverMssg = document.createElement("div");
  recieverCht.classList.add("reciever", "chat", "chat-received");
  recieverMssg.classList.add("reciever", "message-received");
  recieverMssg.innerText = mssge;
  recieverCht.appendChild(recieverMssg);
  phone3.appendChild(recieverCht);
};

const ats = (ar) => {
  var message = "";
  arr.forEach((a) => {
    message += a;
  });
  return message;
};

function encryptMessage(messageText, publicKey) {
  const [e, n] = publicKey;
  const ciphertext = [];

  var message = "";
  messageText.forEach((a) => {
    message += a;
  });

  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const encryptedCharCode = bigMod(charCode, e, n);
    ciphertext.push(encryptedCharCode);
  }
  console.log(ciphertext);
  return ciphertext;
}

function decryptMessage(ciphertext, privateKey) {
  const [d, n] = privateKey;
  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i++) {
    const charCode = ciphertext[i];
    const decryptedCharCode = bigMod(charCode, d, n);
    console.log(decryptedCharCode);

    plaintext += String.fromCharCode(decryptedCharCode);
  }
  return plaintext;
}

const send = (messageText) => {
  const keyPair = generateKeyPair();
  ciphertext = encryptMessage(messageText, keyPair.publicKey);
  plaintext = decryptMessage(ciphertext, keyPair.privateKey);

  senderSend(plaintext);
  hckrReceive(ciphertext);
  recieverReceive(plaintext);

  messagebox.value = null;
};

messagebox.addEventListener("keydown", function (e) {
  if (e.keyCode === 8) {
    messageText.pop();
  } else if (e.keyCode === 13) {
    send(messageText);
    messageText = [];
  } else {
    messageText.push(e.key);
  }
});
