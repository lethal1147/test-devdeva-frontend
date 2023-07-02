import UserTable from "./pages/userTable"
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserTable />} />
      </Routes>
    </Router>
  )
}

export default App
