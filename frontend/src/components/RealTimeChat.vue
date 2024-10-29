<template>
  <div class="chat-container w3-orange">
    <div class="messages" ref="messagesContainer" >
      <div v-for="msg in messages" :key="msg._id" class="message w3-green w3-margin w3-padding"
      >
        <div class="message-content">
          <strong>{{ msg.sender.firstName }} {{ msg.sender.lastName }}:</strong>
          <div class="w3-text-black w3-xlarge w3-margin-bottom">{{ msg.content }}</div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <input v-model="message" placeholder="Mesajınızı yazın" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Gönder</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [], // Gelen mesajlar burada saklanır
      message: '', // Gönderilecek mesaj
      userId: '670bdcbf893828b18eed2fe4', // Mevcut kullanıcının ID'si
      chatRoomId: '670bdfe5509a8cc663800265', // Mevcut chat odası ID'si
    };
  },
  mounted() {
    // Gelen mesajları dinle
    this.$socket.on('receiveMessage', (msg) => {
      console.log("Yeni mesaj alındı:", msg);
      this.messages.push(msg);
      this.scrollToBottom(); // Her mesaj geldiğinde en alta kaydır
    });

    // Odaya katıl
    this.$socket.emit('joinRoom', this.chatRoomId);
  },
  methods: {
    // Mesaj gönderme işlemi
    sendMessage() {
      if (this.message.trim()) {
        console.log("Mesaj gönderiliyor:", this.message);
        this.$socket.emit(
          'sendMessage',
          {
            sender: this.userId,
            content: this.message,
            chatRoom: this.chatRoomId,
          },
          (response) => {
            if (response && response.status === "success") {
              console.log("Mesaj başarıyla gönderildi!");
            } else {
              console.error("Mesaj gönderme hatası:", response.error);
            }
          }
        );
        this.message = ''; // Mesaj gönderildikten sonra inputu temizle
      }
    },

    // Mesajların olduğu container'ı en alta kaydır
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  updated() {
    this.scrollToBottom(); // Mesajlar güncellendiğinde en alta kaydır
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #e0e0e0;
}

.input-container {
  display: flex;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>
