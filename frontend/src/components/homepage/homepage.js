import React, { useState } from "react"
import axios from "axios"
import "./homepage.css"

const Homepage = async () => {
  //fetching the data from server
  const userId = localStorage.getItem("userId")
  const response = await axios.get("http://localhost:8080/fetchEvents", userId)
  console.log(response)

  //states of form
  const [eventData, setEventData] = useState({
    event_name: "",
    event_type: "",
    date: "",
  })

  function handelChange(e) {
    const { name, value } = e.data
    setEventData({
      ...eventData,
      [name]: value,
    })
  }
  console.log(eventData)

  async function addEvent() {
    const res = await axios.get("http://localhost:8080/fetchEvents", { ...eventData, userId })
    console.log(res.data)
  }

  return (
    <div className="events-container">
      <div className="navbar"></div>
      <div className="add-event">
        Event Name: <input type="text" name="event_name" id="event_name" onChange={handelChange} /> <br />
        <br />
        Event type: <input type="text" name="event_type" id="event_type" onChange={handelChange} /> <br />
        <br />
        Event Date: <input type="date" name="date" id="date" onChange={handelChange} /> <br />
        <br />
        <button className="btn" onClick={addEvent}>
          Add Event
        </button>
      </div>

      <div className="events">
        <h1 className="center">Events</h1>
        <div className="event">
          <p>
            <b>Name:</b> eventName
          </p>
          <p>
            <b>Type:</b> eventType
          </p>
          <p>
            <b>Date:</b> eventDate
          </p>
        </div>
        <h2 className="center">Expired Events</h2>
        <div className="event expired">
          <p>
            <b>Name:</b> eventName
          </p>
          <p>
            <b>Type:</b> eventType
          </p>
          <p>
            <b>Date:</b> eventDate
          </p>
        </div>
      </div>
    </div>
  )
}

export default Homepage
