import Register from "./components/register"
import Login from "./components/login"
import Home from "./components/home"
import Dashboard from "./components/dashboard/"
import  NotFound from "./components/notfoundpage"
import Edit from "./components/dashboard/edit"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/profile" element={<Edit/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
