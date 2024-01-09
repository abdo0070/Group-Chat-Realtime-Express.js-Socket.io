const socket = io();

document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chatMessages");
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const userCounter = document.getElementById("userCounter");

  sendButton.addEventListener("click", function () {
    sendMessage();
  });

  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function sendMessage() {
    const name = nameInput.value.trim();
    if (name !== "") {
      nameInput.value = name;
      document.getElementById("senderName").innerHTML = name;
      const messageText = messageInput.value.trim();
      if (messageText === "") return;
      const currentTime = getCurrentTime();
      const data = {
        id: socket.id,
        name: name,
        message: messageText,
        date: currentTime,
      };
      socket.emit("message", data);
    } else {
      alert("Enter Your Name First To Send a Message");
    }
  }
  socket.on("chat message", (data) => {
    const message = document.createElement("div");
    message.innerHTML = `
    <div class="message-text">${data.name}: ${data.message}</div>
    <div class="message-info">${data.name} • <span id="time">${data.date}</span></div>
  `;
    if (data.id === socket.id) {
      message.classList.add("message", "user-message");
    } else {
      // Simulate a bot response (replace this with actual logic)
      message.classList.add("message", "res-message");
    }
    chatMessages.appendChild(message);
    // Clear the input fields
      messageInput.value = "";
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  socket.on("user count", (counter) => {
    userCounter.innerText = counter;
  });
});

