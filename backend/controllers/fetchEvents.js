const express = require("express")
const router = express.Router()

const { check, validationResult } = require("express-validator")

//importing models
const events = require("../models/events")

router.post("/", [check("userId", "Please provide a UserId.").exists()], async (req, res) => {
  const errors = validationResult(req)
  console.log("aa gya ...")
  if (!errors.isEmpty()) {
    return res.status(200).send({ errors: errors.array() })
  }

  const userId = req.body.userId

  try {
    const eventsArray = await events.find({ userId: userId })

    var Events = []
    var expiredEvents = []

    console.log(eventsArray)
    if (!eventsArray) {
      console.log("yes")
      return res.status(200).send({ Events, expiredEvents })
    } else {
      for (var event of eventsArray) {
        if (event.date >= new Date()) result.push(event)
        else {
          expiredEvents.push(event)
        }
      }
      return res.status(200).send({ Events, expiredEvents })
    }
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

module.exports = router
