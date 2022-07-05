import { Route, Routes } from "react-router-dom";
import AdminMain from "./components/adminMain/AdminMain";
import ActionDial from "./components/actionsDial/ActionDial";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminMain />} />
      </Routes>
      <ActionDial />
    </>
  );
};

export default MyRoutes;
