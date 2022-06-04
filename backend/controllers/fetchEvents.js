const express = require("express")
const router = express.Router()

//importing models
const events = require("../models/events")

router.get("/", [check("userId", "Please provide a UserId.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const userId = req.body.userId

  try {
    const eventsArray = await events.find({ userId: userId })

    if (!eventsArray) {
      return res.status(400).json({ errors: [{ msg: "No data." }] })
    } else {
      return res.status(200).json(eventsArray)
    }
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

module.exports = router
