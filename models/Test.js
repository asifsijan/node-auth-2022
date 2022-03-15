const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },

    name: {
        type: String,
        required: true,

    },
    content: {
        type: String,


    },

}, { timestamps: true });

const Test = mongoose.model("test", testSchema);

module.exports = Test;
