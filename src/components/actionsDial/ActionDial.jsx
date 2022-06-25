import { Box, SpeedDial, SpeedDialAction, Modal } from "@mui/material";
import { HomeRepairService, Add, PersonAdd, Print } from "@mui/icons-material";
import { useState } from "react";
import MyModal from "../myModal/MyModal";
import NewProductForm from "../newProductForm/NewProductForm";
const ActionDial = () => {
  const [openModal, setShowModal] = useState(false);
  const actions = [
    { icon: <Add />, name: "New Product" },
    { icon: <PersonAdd />, name: "New User" },
    { icon: <Print />, name: "Print Report" },
  ];

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = () => setShowModal(true);

  return (
    <>
      <Box
        sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
        position="relative"
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<HomeRepairService />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={handleOpenModal}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <MyModal open={openModal} handleClose={handleCloseModal}>
        <NewProductForm />
      </MyModal>
    </>
  );
};

export default ActionDial;
