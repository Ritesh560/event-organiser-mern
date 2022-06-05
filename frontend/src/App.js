import "./App.css"
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

function App() {
  const [user, setUserLogin] = useState({})

  function Home() {
    return user._id ? <Homepage /> : <Login setUserLogin={setUserLogin} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" exact element={<Login setUserLogin={setUserLogin} />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
