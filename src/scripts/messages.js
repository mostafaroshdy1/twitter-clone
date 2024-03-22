import { User } from "./classes/User.js";
import { Post } from "./classes/Post.js";

let contacts = document.getElementsByClassName("contact");
let messageContainer = document.getElementById("messages-container");
let sideFeedTitle = document.querySelector(".side-feed .title h4");
let sideFeedPics = document.querySelectorAll(".side-feed img");
let data = [];

function fetchMessages() {
  fetch("../../public/json/messages.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      // console.log(data);
      createChatHtml(data);
    });
}

fetchMessages();

function fetchContacts() {
  fetch("../../public/json/contacts.json")
    .then((res) => res.json())
    .then((json) => {
      json.sort(() => Math.random() - 0.5);
      const selectedContacts = json.slice(0, 3);

      const contactsContainer = document.getElementById("contacts-container");
      contactsContainer.innerHTML = "";

      // Create contact cards for each selected contact
      selectedContacts.forEach((contact) => {
        const contactElement = document.createElement("div");
        contactElement.classList.add("contact");
        contactElement.dataset.user = contact.user;
        contactElement.dataset.name = contact.name;

        const img = document.createElement("img");
        img.src = contact.profileImage;
        img.alt = "profile";

        const contactDetails = document.createElement("div");
        contactDetails.classList.add("contact-detailes");

        const header = document.createElement("div");
        header.classList.add("header");

        const name = document.createElement("h4");
        name.textContent = contact.name;

        const verifiedIcon = document.createElement("img");
        verifiedIcon.src = contact.verifiedIcon;
        verifiedIcon.alt = "account-status";

        const handle = document.createElement("span");
        handle.textContent = `@${contact.handle}`;

        const paragraph = document.createElement("p");
        paragraph.textContent = contact.message;

        header.appendChild(name);
        header.appendChild(verifiedIcon);
        header.appendChild(handle);

        contactDetails.appendChild(header);
        contactDetails.appendChild(paragraph);

        contactElement.appendChild(img);
        contactElement.appendChild(contactDetails);

        contactsContainer.appendChild(contactElement);
        // console.log(contactElement);
      });
    });
}

fetchContacts();

function createChatHtml(data) {
  // if data empty
  messageContainer.innerHTML = "";
  if (!Object.keys(data).length || !data.chat.length) {
    let msg = document.createElement("div");
    msg.classList.add("alert");
    msg.textContent = "you don't have chat here yet .. say Hi";
    messageContainer.appendChild(msg);
    return;
  }
  data.chat.forEach((chatData) => {
    let message = document.createElement("div");
    let messageState = chatData.stat == "sent" ? "sent" : "received";
    message.classList.add(messageState, "message");
    let body = document.createElement("p");
    body.innerText = chatData.content;
    message.appendChild(body);
    let date = document.createElement("span");
    date.innerText = chatData.date;
    message.appendChild(date);
    messageContainer.appendChild(message);
  });
}

let removeClass = (htmlCollection, classToRemove) => {
  for (let i = 0; i < htmlCollection.length; i++) {
    const element = htmlCollection[i];
    element.classList.remove(classToRemove);
  }
};

function updateChat(user) {
  let targetData = {};
  data.forEach((chatData) => {
    if (chatData.user == user) {
      targetData = chatData;
    }
  });
  createChatHtml(targetData);
}

function updateImageData() {
  for (let i = 0; i < sideFeedPics.length; i++) {
    const element = sideFeedPics[i];
    element.style.display = "block";
  }
}

setTimeout(() => {
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    element.addEventListener("click", () => {
      updateImageData();
      sideFeedTitle.innerText = element.dataset.name;
      removeClass(contacts, "active");
      element.classList.add("active");
      updateChat(element.dataset.user);
    });
  }
}, 1000);
// Emoji data - you can expand this with more emojis if needed
const emojis = ["😊", "😂", "😍", "😎", "👍", "👋", "❤️", "🔥", "🎉", "🌟"];

// Function to create emoji picker UI
function createEmojiPicker() {
  const emojiPicker = document.createElement("div");
  emojiPicker.classList.add("emoji-picker");

  emojis.forEach((emoji) => {
    const emojiButton = document.createElement("button");
    emojiButton.classList.add("emoji-option");
    emojiButton.innerText = emoji;
    emojiButton.addEventListener("click", function () {
      insertEmoji(emoji);
      closeEmojiPicker();
    });
    emojiPicker.appendChild(emojiButton);
  });

  return emojiPicker;
}

// Function to insert emoji into the message input field
function insertEmoji(emoji) {
  const messageInput = document.querySelector(
    '.chat-message input[type="text"]'
  );
  const cursorPos = messageInput.selectionStart;
  const textBeforeCursor = messageInput.value.substring(0, cursorPos);
  const textAfterCursor = messageInput.value.substring(cursorPos);
  messageInput.value = textBeforeCursor + emoji + textAfterCursor;
  messageInput.selectionStart = cursorPos + emoji.length;
  messageInput.selectionEnd = cursorPos + emoji.length;
  messageInput.focus();
}

// Function to toggle the emoji picker visibility
function toggleEmojiPicker() {
  const emojiPicker = document.querySelector(".emoji-picker");
  if (!emojiPicker) {
    const chatMessage = document.querySelector(".chat-message");
    chatMessage.appendChild(createEmojiPicker());
  } else {
    closeEmojiPicker();
  }
}

// Function to close the emoji picker
function closeEmojiPicker() {
  const emojiPicker = document.querySelector(".emoji-picker");
  if (emojiPicker) {
    emojiPicker.remove();
  }
}

// Add event listener to the emoji picker button
document
  .querySelector(".chat-message .emoji-picker-btn")
  .addEventListener("click", toggleEmojiPicker);

// Fetch image from API
function fetchImage() {
  fetch("https://picsum.photos/150/150")
    .then((response) => response.blob())
    .then((blob) => {
      // Convert blob to base64 for localStorage
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => storeImage(reader.result);
    })
    .catch((error) => console.error(error));
}
// Store image in localStorage
function storeImage(dataURI) {
  localStorage.setItem("imageUrl", dataURI);
}
if (!localStorage.getItem("imageUrl")) {
  fetchImage();
}

//Dummy Data
storeUserData(
  localStorage.getItem("imageUrl"),
  User.parse(localStorage.getItem("user")).name,
  User.parse(localStorage.getItem("user")).email
);

// Function to store user data in local storage
function storeUserData(imageUrl, name, email) {
  localStorage.setItem("userImage", imageUrl);
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
}

// Function to retrieve user data from local storage and create user object
function getUserData() {
  const imageUrl = localStorage.getItem("userImage");
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  return {
    imageUrl: imageUrl,
    name: name,
    email: email,
  };
}

// Function to update profile bar with user data
function updateProfileBar() {
  const userData = getUserData();
  if (userData) {
    document.querySelector(".profileImage").src = userData.imageUrl;
    document.getElementById("user_name").innerText = userData.name;
    // Extracting the username part from the email
    const emailParts = userData.email.split("@");
    const username = "@" + emailParts[0];
    document.getElementById("user_email").innerText = username;
  }
}

// Call the updateProfileBar function to fill the data initially
document.addEventListener("DOMContentLoaded", function () {
  updateProfileBar();
});
