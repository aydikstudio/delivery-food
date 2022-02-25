import {
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/main";
import Category from "./pages/category";
import Header from "./components/header";
import Footer from "./components/footer";
import Basket from "./pages/basket";
import MakeOver from "./pages/makeorder";
import MyOrder from "./pages/myorder";
import Agree from "./pages/agree";
import Product from "./pages/product";
import Error_404 from "./pages/errors/404";

import "./App.css";
import Search from "./pages/search";
import { useEffect } from "react";
import MyOrders from "./pages/myorders";
import Settings from "./pages/settings";


function App() {


  useEffect(() => {
    checkAuth()
  }, []);


  async function checkAuth() {
    const formData = new FormData();
    formData.append("token", localStorage.getItem("user_token"));
    formData.append("type","checklogin");


    await axios.post('http://delivery-food/api/managedata.php', formData)
    .then(function (response) {
      if(response.data == "no") {
        localStorage.removeItem("user_token")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/mydata" element={<Settings />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/makeover" element={<MakeOver />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/myorder/:id" element={<MyOrder />} />
        <Route path="/agree" element={<Agree />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="*" element={<Error_404 />} status={404} />
      </Routes>
    <Footer />
    </>
  );
}

export default App;
