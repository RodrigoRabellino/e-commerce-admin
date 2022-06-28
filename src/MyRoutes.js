import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import AdminMain from "./components/adminMain/AdminMain";
import ActionDial from "./components/actionsDial/ActionDial";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminMain />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      <ActionDial />
    </>
  );
};

export default MyRoutes;
