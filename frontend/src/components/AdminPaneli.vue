<template>
  <div class="admin-container">
    <!-- Menü simgesi, yalnızca küçük ekranlarda görünür -->
    <div class="menu-icon" @click="toggleSidebar">☰</div>

    <!-- Kaplama katmanı, yalnızca sidebar açıkken görünür -->
    <div v-if="showSidebar" class="overlay" @click="toggleSidebar"></div>

    <!-- Sidebar, küçük ekranlarda toggle ile açılıp kapanır -->
    <div class="sidebar" :class="{ 'sidebar-active': showSidebar }">
      <h2>Chat Rooms</h2>
      <ul>
        <li v-for="room in chatRooms" :key="room._id" @click="selectChatRoom(room._id)">
          {{ room.name }}
        </li>
        <li>
          + New Room
        </li>
      </ul>
    </div>

    <div v-if="selectedRoomId" class="chat-container">
      <h2>Room: {{ selectedRoomName }}</h2>
      <div class="messages" ref="messagesContainer">
        <div v-for="msg in messages" :key="msg._id" :class="['message', msg.sender.firstName === adminName ? 'admin-message' : 'other-message']">
          <div class="message-content">
            <strong>{{ msg.sender.firstName }} {{ msg.sender.lastName }}:</strong>
            <div class="message-text">{{ msg.content }}</div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <input v-model="message" placeholder="Mesajınızı yazın" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatRooms: [],            // Tüm chat odaları
      selectedRoomId: null,     // Seçilen chat odası
      selectedRoomName: '',     // Seçilen odanın adı
      messages: [],             // Seçilen odadaki mesajlar
      message: '',              // Gönderilecek mesaj
      adminId: '670bdcbf893828b18eed2fe4',  // Admin'in kullanıcı ID'si
      adminName: 'Admin',       // Admin'in ismi
      isAdmin: true,            // Admin olup olmadığını belirten bayrak
      showSidebar: false        // Sidebar toggle durumunu kontrol eder
    };
  },
  mounted() {
    // Tüm odaları yükle
    this.loadChatRooms();
    // Yeni mesaj sesi için ses dosyası yüklüyorum
    this.notificationSound = new Audio('/sounds/notification.mp3');

    // Gelen mesajları dinle
    this.$socket.on('receiveMessage', (msg) => {
      if (msg.chatRoom === this.selectedRoomId) {
        this.messages.push(msg);
        this.playNotificationSound();
        this.scrollToBottom(); // Her mesaj geldiğinde en alta kaydır
      }
    });
  },
  methods: {
    // Sidebar'ı açıp kapatmak için fonksiyon
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    playNotificationSound() {
      if (this.notificationSound) {
        this.notificationSound.play().catch(error => console.log("Ses çalma hatası:", error));
      }
    },
    // Tüm chat odalarını yükle
    async loadChatRooms() {
      try {
        const response = await fetch('https://backend-fimqwb2tta-ez.a.run.app/chatrooms');
        const data = await response.json();
        this.chatRooms = data;
      } catch (error) {
        console.error("Chat odalarını yükleme hatası:", error);
      }
    },

    // Belirli bir chat odasını seç
    async selectChatRoom(roomId) {
      this.selectedRoomId = roomId;
      const selectedRoom = this.chatRooms.find(room => room._id === roomId);
      this.selectedRoomName = selectedRoom.name;

      // Odaya katıl
      this.$socket.emit('joinRoom', roomId);

      // Sidebar'ı kapat
      this.showSidebar = false;

      // Seçilen odadaki mesajları yükle
      await this.loadMessages(roomId);
      this.scrollToBottom(); // Mesajlar yüklendiğinde en alta kaydır
    },

    // Mesajları yükle
    async loadMessages(roomId) {
      try {
        const response = await fetch(`https://backend-fimqwb2tta-ez.a.run.app/messages?roomId=${roomId}`);
        const data = await response.json();
        this.messages = data;
      } catch (error) {
        console.error("Mesajları yükleme hatası:", error);
      }
    },

    // Mesaj gönder
    sendMessage() {
      if (this.message.trim() && this.selectedRoomId) {
        this.$socket.emit(
          'sendMessage',
          {
            sender: {
              firstName: this.adminName,  // Admin'in adı olarak gönderiliyor
              isAdmin: this.isAdmin       // Admin olup olmadığını belirtiyor
            },
            content: this.message,
            chatRoom: this.selectedRoomId
          },
          (response) => {
            if (response && response.status === 'success') {
              console.log('Mesaj başarıyla gönderildi!');
            } else {
              console.error('Mesaj gönderme hatası:', response ? response.error : 'No response');
            }
          }
        );
        this.message = ''; // Mesajı sıfırla
      }
    },

    // Mesajların olduğu container'ı en alta kaydır
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },
  updated() {
    this.scrollToBottom(); // Mesajlar güncellendiğinde en alta kaydır
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 80vh;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  margin: 20px auto;
}

/* Menü simgesi - yalnızca mobil ekranlarda görünecek */
.menu-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

/* Overlay - Sidebar açıkken görünür */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* Sidebar varsayılan geniş ekranlarda görünür */
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ccc;
  z-index: 101; /* Sidebar overlay'in üstünde görünür */
}

/* Mobil ekranlar için sidebar gizleme ve toggle */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  .sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
  }
  .sidebar-active {
    display: block;
  }
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.sidebar ul li:hover {
  background-color: #ddd;
}

/* Chat container */
.chat-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
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
}

.admin-message {
  align-self: flex-start;
  background-color: #dcf8c6;
  color: #333;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 20px;
}

.other-message {
  align-self: flex-end;
  background-color: #fff;
  color: #333;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 20px;
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
  background-color: #4caf50;
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
