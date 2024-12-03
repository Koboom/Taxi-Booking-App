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
      textareaHeight: 40,     // Varsayılan textarea yüksekliği
    };
  },
  mounted() {
    // Yeni mesaj sesi için ses dosyası yüklüyorum
    this.notificationSound = new Audio('/sounds/notification.mp3');

    // Gelen mesajları dinle
    this.$socket.on('receiveMessage', (msg) => {
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
        this.notificationSound.play().catch(error => console.log("Ses çalma hatası:", error));
      }
    },
    resizeTextarea() {
      // Mesaj alanının yüksekliğini otomatik olarak ayarlayın
      const textarea = this.$refs.messageInput;
      textarea.style.height = 'auto';
      this.textareaHeight = Math.min(textarea.scrollHeight, 100); // Maksimum 100px
    },
    async sendMessage() {
      if (!this.message.trim()) return;
      this.sendingMessage = true;

      this.$socket.emit(
        'sendMessage',
        {
          sender: { firstName: this.userId, isAdmin: this.isAdmin },
          content: this.message,
          chatRoom: this.chatRoomId,
        },
        (response) => {
          this.sendingMessage = false;
          if (response && response.status === "success") {
            this.message = '';
            this.textareaHeight = 40; // Gönderim sonrası textarea yüksekliğini sıfırla
            this.$refs.messageInput.focus();
          } else {
            console.error("Mesaj gönderme hatası:", response ? response.error : 'No response');
          }
        }
      );
    },
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
      <textarea
        v-model="message"
        placeholder="Message..."
        @keyup.enter="sendMessage"
        ref="messageInput"
        @input="resizeTextarea"
        :style="{ height: textareaHeight + 'px' }"
      ></textarea>
      <button @click="sendMessage" :disabled="sendingMessage">{{ sendingMessage ? 'Sending...' : 'Send' }}</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 95%;
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

textarea {
  flex: 1;
  padding: 12px 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
  overflow-y: hidden;
  transition: border-color 0.2s;
}

textarea:focus {
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

@media (max-width: 768px) {
  .chat-container {
    padding: 15px;
    height: 80vh;
    border-radius: 8px;
  }

  .message {
    max-width: 95%;
  }

  .input-container {
    gap: 5px;
  }

  textarea {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
