const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    postID: _Id,
    replyNickname: String,
    replyComment: String,
    replyDel: Number,
});
replySchema.virtual("replyID").get(function () {
    return this._id.toHexString();
});
replySchema.set("toJSON", {
    virtuals: true,
});
module.exports = mongoose.model("reply", replySchema);