const express = require("express")
const router = express.Router()

const { check, validationResult } = require("express-validator")

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
      let result = []

      for (var event of eventsArray) {
        if (event.date > new Date()) result.push(event)
      }

      return res.status(200).json(result)
    }
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

module.exports = router
