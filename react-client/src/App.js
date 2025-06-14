import Register from "./components/register"
import Login from "./components/login"
import Home from "./components/home"
import Dashboard from "./components/dashboard/"
import Edit from "./components/dashboard/edit"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home title="INI HALAMAN HOME"/>}/>
        <Route path="/login" element={<Login title="LOGIN PAGE" description="MINI ABSENSI APPS"/>}/>
        <Route path="/register" element={<Register title="REGISTER PAGE" description="MINI ABSENSI APPS"/>}/>
        <Route path="/dashboard" element={<Dashboard title="DASHBOARD" />} />
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
