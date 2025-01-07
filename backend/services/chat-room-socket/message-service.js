const BaseService = require("../base-service");
const Message = require("../../models/chat-room-socket/message");

class MessageService extends BaseService {
  // Belirli bir oda için mesajları getir
  async getMessagesByChatRoom(chatRoomId) {
    return this.query({ chatRoom: chatRoomId });
  }

  // Belirli bir kullanıcıya gelen mesajları getir
  async getMessagesForUser(userId) {
    return this.query({ receiver: userId });
  }
}

module.exports = new MessageService(Message);
