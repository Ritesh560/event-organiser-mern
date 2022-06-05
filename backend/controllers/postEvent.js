const express = require("express")
const router = express.Router()

//validatior and bcrypt for authetentication
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

//importing models
const User = require("../models/user")
const events = require("../models/events")

router.post("/", [check("userId", "please Enter a valid userId.").exists(), check("event_name", "Event name is required.").exists(), check("event_type", "Event type is required.").exists(), check("date", "Event date is required.").exists()], async (req, res) => {
  const errors = validationResult(req)
  console.log(req.body)

  if (!errors.isEmpty()) {
    return res.status(200).send({ errors: errors.array() })
  }

  const { event_name, event_type, date, userId } = req.body

  try {
    let user = await User.findOne({ userId: userId })
    if (!user) {
      return res.status(200).send({ errors: [{ msg: "User does not exist." }] })
    }

    const event = new events({
      userId,
      event_name,
      event_type,
      date,
    })
    await event.save()

    res.status(200).send({ msg: "uploaded successfully.", userId })
  } catch (err) {
    console.log(err)
    req.status(200).send(err)
  }
})

module.exports = router
