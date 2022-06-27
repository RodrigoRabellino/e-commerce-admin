import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import AdminMain from "./components/adminMain/AdminMain";
import ActionDial from "./components/actionsDial/ActionDial";
import ProductList from "./components/productList/ProductList";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminMain />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <ActionDial />
    </>
  );
};

export default MyRoutes;
