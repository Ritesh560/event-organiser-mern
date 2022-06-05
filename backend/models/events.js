const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    event_name: {
      type: String,
      required: true,
    },
    event_type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = reviews = mongoose.model("events", useSchema)
