const messagebox = document.querySelector(".message-box");
const encrypt_mssge = document.querySelector(".encrypted_message");
const encryptKey = document.querySelectorAll(".encryptKey input");
const decryptKey = document.querySelectorAll(".decryptKey input");
const phone1 = document.querySelector(".chats__phone1");
const phone2 = document.querySelector(".chats__phone2");
const phone3 = document.querySelector(".chats__phone3");

let letters = [" ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G", 
  "H", 
  "I", 
  "J", 
  "K", 
  "L", 
  "M", 
  "N", 
  "O", 
  "P", 
  "Q", 
  "R", 
  "S", 
  "T", 
  "U", 
  "V", 
  "W", 
  "X", 
  "Y", 
  "Z",
  "z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

let messageText = [];

let cnt = 0;
let cnt1 = 0;

encryptKey.forEach(input => {input.addEventListener('click', function() {
  encryptionKey = input.valueAsNumber; 
})});
decryptKey.forEach(input => {input.addEventListener('click', function() {
  decryptionKey = input.valueAsNumber;
})});

function caesarCipher(stringArray, key) {
  const resultArray = [];

  for (let i = 0; i < stringArray.length; i++) {
    const originalString = stringArray[i];
    let cipheredString = '';

    for (let j = 0; j < originalString.length; j++) {
      const char = originalString[j];
      
      // Check if the character is a letter
      if (char.match(/[a-z]/i)) {
        const charCode = originalString.charCodeAt(j);
        let cipheredCharCode;

        // Determine the new character code based on the key
        if (char === char.toLowerCase()) {
          cipheredCharCode = ((charCode - 97 + key) % 26) + 97; // Lowercase letters
        } else {
          cipheredCharCode = ((charCode - 65 + key) % 26) + 65; // Uppercase letters
        }

        cipheredString += String.fromCharCode(cipheredCharCode);
      } else {
        // Append non-letter characters as they are
        cipheredString += char;
      }
    }

    resultArray.push(cipheredString);
  }

  return resultArray;
}

function dcaesarCipher(stringArray, key, decrypt = false) {
  const resultArray = [];

  for (let i = 0; i < stringArray.length; i++) {
    const originalString = stringArray[i];
    let transformedString = '';

    for (let j = 0; j < originalString.length; j++) {
      const char = originalString[j];
      
      // Check if the character is a letter
      if (char.match(/[a-z]/i)) {
        const charCode = originalString.charCodeAt(j);
        let transformedCharCode;

        if (decrypt) {
          // Perform decryption by shifting the character code back by the key
          if (char === char.toLowerCase()) {
            transformedCharCode = ((charCode - 97 - key + 26) % 26) + 97; // Lowercase letters
          } else {
            transformedCharCode = ((charCode - 65 - key + 26) % 26) + 65; // Uppercase letters
          }
        } else {
          // Perform encryption by shifting the character code forward by the key
          if (char === char.toLowerCase()) {
            transformedCharCode = ((charCode - 97 + key) % 26) + 97; // Lowercase letters
          } else {
            transformedCharCode = ((charCode - 65 + key) % 26) + 65; // Uppercase letters
          }
        }

        transformedString += String.fromCharCode(transformedCharCode);
      } else {
        // Append non-letter characters as they are
        transformedString += char;
      }
    }

    resultArray.push(transformedString);
  }

  return resultArray;
}


const bobSend = mssge => {
  let text = '';
   mssge.map(letter => {
    text += letter;
  });
  let BobCht = document.createElement("div");
  let BobMssg = document.createElement("div");
  BobCht.classList.add("Bob", "chat", "chat-sent");
  BobMssg.classList.add("Bob", "message-sent");
  BobMssg.innerText = text;
  BobCht.appendChild(BobMssg);
  phone1.appendChild(BobCht);
}

const hckrReceive = mssge => {
  let text = '';
   mssge.map(letter => {
    text += letter;
  });
  let hckrCht = document.createElement("div");
  let hckrMssg = document.createElement("div");
  hckrCht.classList.add("Bob", "chat", "chat-sent");
  hckrMssg.classList.add("Bob", "message-sent");
  hckrMssg.innerText = text;
  hckrCht.appendChild(hckrMssg);
  phone2.appendChild(hckrCht);
  console.log(text);
}

const AshlyReceive = mssge => {
  let text = '';
   mssge.map(letter => {
    text += letter;
  });
  let AshCht = document.createElement("div"); 
  let AshMssg = document.createElement("div");
  AshCht.classList.add("Ashley","chat", "chat-received")
  AshMssg.classList.add("Ashley", "message-received");
  AshMssg.innerText = text;
  AshCht.appendChild(AshMssg);
  phone3.appendChild(AshCht);
}


const send = (mssge) => {
  let enkeys = [];
  messageToSend = caesarCipher(messageText, 13);
  enkeys = dcaesarCipher(messageToSend, 13, true);
  bobSend(enkeys);
  hckrReceive(messageToSend);
  AshlyReceive(enkeys);
  messagebox.value = "";
}

messagebox.addEventListener('keydown', function(e) {
  if(e.keyCode === 8){
    messageText.pop()
}
  else if(e.keyCode === 13){
    send(messageText);
    messageText = [];
  }
  else{
    messageText.push(e.key);
  }
});

const sendbtn = document.querySelector(".send-button");
sendbtn.addEventListener('click',()=>{
  send(messageText);
})