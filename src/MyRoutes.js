import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLogin from "./components/login/AdminLogin";
import DashBoard from "./components/dashboard/DashBoard";
import AdminMain from "./components/adminMain/AdminMain";
import ActionDial from "./components/actionsDial/ActionDial";
import ProductList from "./components/productList/ProductList";

const MyRoutes = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin);

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
