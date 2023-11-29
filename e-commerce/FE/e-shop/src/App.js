import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoMatchPage from './components/NoMatchPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import Store from './components/Store';
function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
  });
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NoMatchPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Router>
        <ToastContainer />
      </UserContext.Provider>
    </>
  );
}

export default App;
