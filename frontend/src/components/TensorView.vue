<template>
  <div>
    <h1>Yapay Zeka Chatbot</h1>
    <div class="chat-container">
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ user: message.user, bot: !message.user }"
        >
          {{ message.text }}
        </div>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="userInput"
          @keydown.enter="sendMessage"
          placeholder="Sorunuzu yazın..."
        />
        <button @click="sendMessage">Gönder</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === "") return;

      // Kullanıcı mesajını ekle
      this.messages.push({ text: this.userInput, user: true });

      // Chatbot cevabı
      const response = this.getBotResponse(this.userInput);

      // Chatbot mesajını ekle
      setTimeout(() => {
        this.messages.push({ text: response, user: false });
      }, 500);

      // Girdi alanını temizle
      this.userInput = "";
    },
    getBotResponse(input) {
      // Basit bir yanıt mekanizması
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("merhaba") || lowerInput.includes("hello")) {
        return "Merhaba! Size nasıl yardımcı olabilirim?";
      } else if (lowerInput.includes("hava")) {
        return "Havanın güzel olduğunu düşünüyorum! Sizce?";
      } else if (lowerInput.includes("nasılsın")) {
        return "Ben bir yapay zeka olduğum için hep iyiyim. Siz nasılsınız?";
      } else {
        return "Bunu tam olarak anlayamadım, lütfen tekrar dener misiniz?";
      }
    },
  },
};
</script>

<style>

.chat-container {
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.messages {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.messages div {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.user {
  background-color: #d1e7dd;
  text-align: right;
}

.bot {
  background-color: #f8d7da;
  text-align: left;
}

.input-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0b5ed7;
}
</style>
