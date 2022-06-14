import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import AddBuku from './Components/AddBuku';
import EditBuku from './Components/EditBuku';
import AuthService from "./service/auth-service";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import TransaksiAdmin from "./Container/TransaksiAdmin";
import EditTransaksiAdmin from "./Container/EditTransaksiAdmin";
import AddTransaksiAdmin from "./Container/AddTransaksiAdmin";
import HistoryUser from "./Container/HistoryUser";
import OrderUser from "./Container/OrderUser";
import './App.css';
import './Components/style.css';

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if(user.roles[0] == "ROLE_ADMIN"){
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
      else {
        setShowUserBoard(user.roles.includes("ROLE_USER"));
      }
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Books App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/transaksi"} className="nav-link">
                Transaksi
              </Link>
            </li>
          )}
          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/history"} className="nav-link">
                History
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/history" element={<HistoryUser/>} />
          <Route path="/transaksi" element={<TransaksiAdmin/>} />
          <Route path="/transaksi/add" element={<AddTransaksiAdmin/>} />
          <Route path='/transaksi/:id' element={<EditTransaksiAdmin/>}></Route>
          <Route path='/order/:idBuku' element={<OrderUser/>}></Route>
          <Route path='/add' element={<AddBuku/>}></Route>
          <Route path='/edit/:id' element={<EditBuku/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
