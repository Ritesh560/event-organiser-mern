const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = reviews = mongoose.model("events", useSchema)
