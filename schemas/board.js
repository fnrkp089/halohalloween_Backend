const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    postingTitle: String,
    postingAuthor: String,
    postingDate: String,
    postingUpdate: String,
    postingComment: String,
    postingImgUrl: String,
    postingVideoUrl: String,
    postingTag: String,
    postingDel: Number,
});
ReplySchema.virtual("postID").get(function () {
    return this._id.toHexString();
});
ReplySchema.set("toJSON", {
    virtuals: true,
});
module.exports = mongoose.model("board", boardSchema);