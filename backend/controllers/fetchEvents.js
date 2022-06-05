const express = require("express")
const router = express.Router()

const { check, validationResult } = require("express-validator")

//importing models
const events = require("../models/events")

router.post("/", [check("userId", "Please provide a UserId.").exists()], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log("error")
    return res.status(200).send({ errors: errors.array() })
  }

  const userId = req.body.userId
  console.log(userId)

  try {
    const eventsArray = await events.find({ userId: userId })

    var Events = []
    var expiredEvents = []

    if (!eventsArray) {
      return res.status(200).send({ Events, expiredEvents })
    } else {
      var result = ""
      var d = new Date()

      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const date = d.getDate()
      result += year + `${month < 10 ? "-0" : "-"}` + month + `${date < 10 ? "-0" : "-"}` + date

      console.log(result)

      for (var event of eventsArray) {
        if (event.date >= result) {
          Events = [...Events, event]
        } else {
          expiredEvents = [event, ...expiredEvents]
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
