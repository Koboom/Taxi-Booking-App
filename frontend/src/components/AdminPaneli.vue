<template>
    <div class="admin-container">
      <div class="sidebar">
        <h2>Chat Odaları</h2>
        <ul>
          <li v-for="room in chatRooms" :key="room._id" @click="selectChatRoom(room._id)">
            {{ room.name }}
          </li>
        </ul>
      </div>

      <div v-if="selectedRoomId" class="chat-container w3-black">
        <h2 class="w3-text-orange w3-xlarge">Oda: {{ selectedRoomName }}</h2>
        <div class="messages" ref="messagesContainer">
          <div v-for="msg in messages" :key="msg._id" class="message w3-orange w3-margin w3-padding" >
            <div class="message-content ">
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
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        chatRooms: [], // Tüm chat odaları
        selectedRoomId: null, // Seçilen chat odası
        selectedRoomName: '',
        messages: [], // Seçilen odadaki mesajlar
        message: '', // Gönderilecek mesaj
        adminId: '670bdcbf893828b18eed2fe4', // Admin'in kullanıcı ID'si
      };
    },
    mounted() {
      // Tüm odaları yükle
      this.loadChatRooms();

      // Gelen mesajları dinle
      this.$socket.on('receiveMessage', (msg) => {
        if (msg.chatRoom === this.selectedRoomId) {
          this.messages.push(msg);
          this.scrollToBottom(); // Her mesaj geldiğinde en alta kaydır
        }
      });
    },
    updated() {
      this.scrollToBottom(); // Mesajlar güncellendiğinde en alta kaydır
    },
    methods: {
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
              sender: this.adminId,
              content: this.message,
              chatRoom: this.selectedRoomId,
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
      },
    },
  };
  </script>

  <style scoped>
  .admin-container {
    display: flex;
    height: 80vh;
  }

  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    border-right: 1px solid #ccc;
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

  .chat-container {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

  .admin-message {
    background-color: #daf7a6;
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
