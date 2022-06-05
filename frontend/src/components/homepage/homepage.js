import React, { useState, useEffect } from "react"
import axios from "axios"
import "./homepage.css"

const Homepage = () => {
  const [response, setResponse] = useState({})
  const [userId, setUserId] = useState(localStorage.getItem("userId"))
  const [count, setCount] = useState(0)
  console.log(response)

  //fetching the data from server
  useEffect(() => {
    const fetchEvents = async () => {
      setUserId(localStorage.getItem("userId"))
      await axios.post("http://localhost:8080/fetchEvents", { userId: userId }).then((re) => {
        setResponse(re)
        console.log(re)
      })
    }

    fetchEvents()
  }, [count])

  //states of form
  const [eventData, setEventData] = useState({
    event_name: "",
    event_type: "",
    date: "",
  })

  function handelChange(e) {
    const { name, value } = e.target
    setEventData({
      ...eventData,
      [name]: value,
    })
  }

  async function addEvent() {
    const res = await axios.post("http://localhost:8080/postEvent", { ...eventData, userId })
    if (res.data.errors) {
      return alert(res.data.errors[0].msg)
    }
    setCount(count + 1)
    alert(res.data.msg)
    setEventData({
      event_name: "",
      event_type: "",
      date: "",
    })
  }

  return (
    <div className="events-container">
      <div className="navbar"></div>
      <div className="add-event">
        Event Name: <input type="text" name="event_name" id="event_name" onChange={handelChange} value={eventData.event_name} /> <br />
        <br />
        Event type: <input type="text" name="event_type" id="event_type" onChange={handelChange} value={eventData.event_type} /> <br />
        <br />
        Event Date: <input type="date" name="date" id="date" onChange={handelChange} value={eventData.date} /> <br />
        <br />
        <button className="btn" onClick={addEvent}>
          Add Event
        </button>
      </div>

      <div className="events">
        <h1 className="center">Events</h1>
        {response.data ? (
          response.data.Events.map((eve) => {
            return (
              <div className="event">
                <p>
                  <b>Name:</b> {eve.event_name}
                </p>
                <p>
                  <b>Type:</b> {eve.event_type}
                </p>
                <p>
                  <b>Date:</b> {eve.date}
                </p>
              </div>
            )
          })
        ) : (
          <div>
            <h3 className="center">No data</h3>
          </div>
        )}

        <h2 className="center">Expired Events</h2>
        {response.data ? (
          response.data.expiredEvents.map((expEve) => {
            return (
              <div className="event expired">
                <p>
                  <b>Name:</b> {expEve.event_name}
                </p>
                <p>
                  <b>Type:</b> {expEve.event_type}
                </p>
                <p>
                  <b>Date:</b> {expEve.date}
                </p>
              </div>
            )
          })
        ) : (
          <div>
            <h3 className="center">No data</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
