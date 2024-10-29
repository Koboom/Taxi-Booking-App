const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: { maxDepth: 1 }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

chatRoomSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
