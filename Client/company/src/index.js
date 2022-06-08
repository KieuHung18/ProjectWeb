import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route,Navigate,Outlet } from 'react-router-dom';
import { Footer } from './page/Footer/Footer';
import { NavBar } from './page/NavBar/NavBar';
import { HomePage } from './page/HomePage/HomePage';
import Register from './page/Register/Register';
import { NotFound } from './page/NotFound/NotFound';
import Login from './page/Login/Login';
import Store from './page/Store/Store';
import Profile from './page/Profile/Profile';
const UserRoute = ({
  redirectPath = '/login',
  children,
}) => {
  if (!localStorage.getItem("user")) {
    alert("You must login first")
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
const AdminRoute = ({
  redirectPath = '/home',
  children,
}) => {
  if (localStorage.getItem("user").role!=="ROLE_ADMIN") {
    alert("Accessible by admin only")
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
const Application = () => {
  
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      {/* PUBLIC ROUTES IN HERE */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="store" element={<Store />} />

      <Route path="profile" element={<Profile />} />

      <Route element={<UserRoute/>}>
        {/* USER ROUTES IN HERE */}
        

        <Route element={<AdminRoute/>}>
        {/* ADMIN ROUTES IN HERE*/}

        </Route>

      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
  <Application/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
