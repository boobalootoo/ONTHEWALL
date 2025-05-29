const scriptURL = "https://script.google.com/macros/s/AKfycbweuR6nHAref77Fw5yxoUG2jOJfnWYz8xCA4vWLj9a4CA274VnwP7_Kg8EhSFTw-O3QUw/exec";

document.getElementById("message-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) return;

  await fetch(scriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  document.getElementById("message-form").reset();
  loadMessages();
});

async function loadMessages() {
  const res = await fetch(scriptURL);
  const messages = await res.json();
  const container = document.getElementById("messages");
  container.innerHTML = "";
  messages.reverse().forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>${msg.name}</strong><br><small>${new Date(msg.timestamp).toLocaleString()}</small><p>${msg.message}</p>`;
    container.appendChild(div);
  });
}

loadMessages();
