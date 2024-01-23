const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId, // id
      ref: "User", // reference (link) to table Note
    },
  ],
});

// Change toJSON method so it doesnt return id and version when fetching from DB
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); //convert to str as is object
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
