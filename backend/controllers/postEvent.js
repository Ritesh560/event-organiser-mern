const express = require("express")
const router = express.Router()

//validatior and bcrypt for authetentication
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

//importing models
const User = require("../models/user")
const events = require("../models/events")

router.post("/", [check("email", "please Enter a valid email.").isEmail(), check("event_name", "Event name is required.").exists(), check("event_type", "Event type is required.").exists(), check("password", "Password is required.").exists(), check("date", "Event date is required.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { evnet_name, event_type, date, email, password } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User does not exist." }] })
    }

    //authenticating password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    var userId = user.id

    const event = new events({
      userId,
      evnet_name,
      event_type,
      date,
    })
    await event.save()

    res.status(200).json({ msg: "uploaded successfully.", userId })
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

module.exports = router
