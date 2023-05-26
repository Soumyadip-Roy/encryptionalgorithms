const messagebox = document.querySelector(".message-box");
const encrypt_mssge = document.querySelector(".encrypted_message");
const encryptKey = document.querySelectorAll(".encryptKey input");
const decryptKey = document.querySelectorAll(".decryptKey input");
const phone1 = document.querySelector(".chats__phone1");
const phone2 = document.querySelector(".chats__phone2");
const phone3 = document.querySelector(".chats__phone3");

// Encryption function
async function encryptAES(key, plaintext) {
  const encodedText = new TextEncoder().encode(plaintext);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    "AES-CBC",
    true,
    ["encrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    cryptoKey,
    encodedText
  );

  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return combined;
}

// Decryption function
async function decryptAES(key, ciphertext) {
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    "AES-CBC",
    true,
    ["decrypt"]
  );

  const iv = ciphertext.slice(0, 16);
  const data = ciphertext.slice(16);
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    cryptoKey,
    data
  );

  return new TextDecoder().decode(decryptedData);
}

// Generate a random 256-bit key
const key = window.crypto.getRandomValues(new Uint8Array(32));

// Encrypt a message
var ct='', pt='';
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
  let text = mssge;
  console.log(text);
    
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

const ats = (arr) => {
  var message = "";
  arr.forEach((a) => {
    message += a;
  });
  return message;
};

const send = (messageText) => {

  encryptAES(key, ats(messageText))
    .then((ciphertext) => {
      console.log("Ciphertext:", ciphertext);
      ct = ciphertext;
      // Decrypt the ciphertext
      decryptAES(key, ciphertext)
        .then((plaintext) => {
          console.log("Plaintext:", plaintext);
          pt = plaintext;
          senderSend(pt);
          hckrReceive(ct);
          recieverReceive(pt);
        })
    })
    .catch((error) => {
      console.error("Encryption error:", error);
    });
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
  console.log(messageText)
});
const sendbtn = document.querySelector(".send-button");
sendbtn.addEventListener('click',()=>{
  send(messageText);
})