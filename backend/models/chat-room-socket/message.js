const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        autopopulate: { maxDepth: 1 }
    },
    receiver: { // Eger belirli bir kişiye gönderiliyorsa
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: { maxDepth: 1}
    },
    content: {
        type: String,
        required: true
    },
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        autopopulate: { maxDepth: 1 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

MessageSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("Message", MessageSchema)
