const BaseService = require("../base-service")
const ChatRoom = require("../../models/chat-room-socket/chatRoom")

class ChatRoomService extends BaseService {
    async getRoomsForUser(userId) {
        return this.query({ participants: userId });
    }
}

module.exports = new ChatRoomService(ChatRoom)