<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div
        v-for="msg in messages"
        :key="msg._id"
        :class="['message', msg.sender.firstName === userId ? 'user-message' : 'other-message']"
      >
        <div class="message-content">
          <strong>{{ msg.sender.firstName || "Anonim" }}:</strong>
          <div class="message-text">{{ msg.content }}</div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <input v-model="message" placeholder="Mesajınızı yazın..." @keyup.enter="sendMessage" ref="messageInput" />
      <button @click="sendMessage" :disabled="sendingMessage">{{ sendingMessage ? 'Gönderiliyor...' : 'Gönder' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],           // Gelen mesajlar burada saklanır
      message: '',            // Gönderilecek mesaj
      sendingMessage: false,  // Mesaj gönderiliyor mu?
      userId: 'Anonim',       // Mevcut kullanıcının ID'si
      chatRoomId: '672739d1442932e3066e9e8c', // Mevcut chat odası ID'si
      isAdmin: true,          // Admin mi?
    };
  },
  mounted() {
    // Yeni mesaj sesi için ses dosyası yüklüyorum
  this.notificationSound = new Audio('/sounds/notification.mp3');

// Gelen mesajları dinle
this.$socket.on('receiveMessage', (msg) => {
  console.log("Yeni mesaj alındı:", msg);
  this.messages.push(msg);
  this.playNotificationSound();
  this.scrollToBottom(); // Her mesaj geldiğinde en alta kaydır
});

// Odaya katıl
this.$socket.emit('joinRoom', this.chatRoomId);
  },
  methods: {
    playNotificationSound() {
  if (this.notificationSound) {
    console.log("Ses çalınıyor..."); // Sesin çalındığını kontrol etmek için
    this.notificationSound.play().catch(error => console.log("Ses çalma hatası:", error));
  }
},
    // Mesaj gönderme işlemi
    async sendMessage() {
      if (!this.message.trim()) return; // Boş mesajları engelle

      this.sendingMessage = true;
      console.log("Mesaj gönderiliyor:", this.message);

      this.$socket.emit(
        'sendMessage',
        {
          sender: { firstName: this.userId, isAdmin: this.isAdmin }, // Gönderici bilgisi burada ekleniyor
          content: this.message,
          chatRoom: this.chatRoomId,
        },
        (response) => {
          this.sendingMessage = false;
          if (response && response.status === "success") {
            console.log("Mesaj başarıyla gönderildi!");
            this.message = ''; // Mesaj gönderildikten sonra inputu temizle
            this.$refs.messageInput.focus(); // Girdi alanını tekrar odakla
          } else {
            console.error("Mesaj gönderme hatası:", response ? response.error : 'No response');
          }
        }
      );
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
  height: 70vh;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 60%;
  max-width: 600px;
  margin: 20px auto;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.user-message {
  align-self: flex-end;
  background-color: #dcf8c6;
  color: #333;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 20px;
}

.other-message {
  align-self: flex-start;
  background-color: #fff;
  color: #333;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 20px;
}

.message-content {
  font-size: 14px;
}

.message-text {
  font-size: 16px;
  margin-top: 5px;
}

.input-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 12px 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4caf50;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
</style>
