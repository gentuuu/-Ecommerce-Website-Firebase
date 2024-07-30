import {Route, Routes, Navigate} from "react-router-dom"

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (

        <Routes >
          <Route path="/" element={<Navigate to="home"/>} />
          <Route path="home" element={<Home/>} />
          <Route path="shop" element={<Shop/>} />
          <Route path="shop/:id" element={<ProductDetails/>} />
          <Route path="cart" element={<Cart/>} />
          {/* <Route path="Checkout" element={<Checkout/>} /> */}
          <Route 
            path="checkout" 
            element={
              <ProtectedRoute>
                <Checkout/>
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
        </Routes>
    
     
  )
}

export default Routers