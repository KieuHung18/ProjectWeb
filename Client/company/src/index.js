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
import Product from './page/Store/Product';
import WishList from './page/WishList/WishList';
import AddProduct from './page/AddProduct/AddProduct';
import Admin from './page/Admin/Admin';
import $ from "jquery";
import { useEffect,useState } from 'react';
import EditProduct from './page/AddProduct/EditProduct';
import AddUser from './page/Admin/AddUser';

const Application = () => {
  const [user=true, setUser] = useState();
  const [admin=true, setAdmin] = useState();
  useEffect(() => {
    $.ajax({
        headers: {
          'authorization':localStorage.getItem("authorization"),
        },
        type: "GET",
        url: "http://localhost:8080/company/protecteduser",
        success: function(){
          setUser(true)
          },
         error: function(){
          setUser(false)
         }
      });
    $.ajax({
        headers: {
          'authorization':localStorage.getItem("authorization"),
        },
        type: "GET",
        url: "http://localhost:8080/company/protectedadmin",
        success: function(){
          setAdmin(true)
          },
          error: function(){
          setAdmin(false)
          }
      });
  }, []);


  const UserRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    if (user) {
    return children ? children : <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
  };
  const AdminRoute = ({
    redirectPath = '/home',
    children,
  }) => {
    if (admin) {
    return children ? children : <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
  };
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
      <Route path="product/:id" element={<Product/>} />
      <Route path="wishlist" element={<WishList />} />

      <Route element={<UserRoute/>}>
        {/* USER ROUTES IN HERE */}
        <Route path="profile" element={<Profile />} />
        <Route path="transaction" element={<Profile />} />
        <Route element={<AdminRoute/>}>
        {/* ADMIN ROUTES IN HERE*/}
        <Route path="admin" element={<Admin />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
        <Route path="adduser" element={<AddUser />} />
        
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
