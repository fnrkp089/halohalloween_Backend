const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userEmail: String,
    userNickname: String,
    userPassword: String,
});
userSchema.virtual("userID").get(function() {
    return this._id.toHexString();
});
userSchema.set("toJSON", {
    virtuals: true,
});
module.exports = mongoose.model("user", userSchema);