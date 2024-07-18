import {Route, Routes, Navigate} from "react-router-dom"

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";

const Routers = () => {
  return (

        <Routes >
          <Route path="/" element={<Navigate to="home"/>} />
          <Route path="Home" element={<Home/>} />
          <Route path="Shop" element={<Shop/>} />
          <Route path="Shop/:id" element={<ProductDetails/>} />
          <Route path="Cart" element={<Cart/>} />
          <Route path="Checkout" element={<Checkout/>} />
          <Route path="Login" element={<Login/>} />
          <Route path="Signup" element={<Signup/>} />
        </Routes>
    
     
  )
}

export default Routers