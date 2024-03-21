let contacts = document.getElementsByClassName("contact");
let messageContainer = document.getElementById("messages-container");

let data = [
  {
    user: "test",
    chat: [
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "recived",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "recived",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "recived",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "recived",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repellendus dolore magni veniam asperiores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
    ],
  },
  {
    user: "user",
    chat: [
      {
        content: "Lorem um illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content: "Lorem ipsum, doriores iusto illum illo",
        stat: "recived",
        date: "Apr 2, 2018 9:36PM",
      },
      {
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit.speriores iusto illum illo",
        stat: "sent",
        date: "Apr 2, 2018 9:36PM",
      },
    ],
  },
  {
    user: "empty",
    chat: [],
  },
];

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
    let messageState = chatData.stat == "sent" ? "sent" : "recived";
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
  data.forEach((e) => {
    if (e.user == user) {
      targetData = e;
    }
  });
  createChatHtml(targetData);
}

for (let i = 0; i < contacts.length; i++) {
  const element = contacts[i];
  element.addEventListener("click", () => {
    removeClass(contacts, "active");
    element.classList.add("active");
    updateChat(element.dataset.user);
  });
}
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
  // Optionally, you can move the cursor position after inserting the emoji
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
