import { Route, Routes } from "react-router-dom";
import { MainNavBar } from "../MainNav/MainNav";
import { Landing } from "../landing/landing";
import WovenImageList from "../Listing/Listing";
import { ViewProduct } from "../view/viewProduct";
import { Cart } from "../cart/cart";
import { Login } from "../auth/login/login";
import { SignUp } from "../auth/signUp/signUp";

export const AllRoutes = () => {
  return (
    <>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products/:routeName" element={<WovenImageList />} />
        <Route path="/product/:view" element={<ViewProduct />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};
