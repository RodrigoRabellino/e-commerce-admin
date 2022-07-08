import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { HomeRepairService, Add, Print, Cottage } from "@mui/icons-material";
import { useState } from "react";
import MyModal from "../myModal/MyModal";
import NewProductForm from "../newProductForm/NewProductForm";

const ActionDial = () => {
  const [openModal, setShowModal] = useState(false);
  const actions = [
    { icon: <Add />, name: "New Product", onClick: () => handleOpenModal() },
    { icon: <Print />, name: "Print Report", onClick: () => {} },
    {
      icon: <Cottage />,
      name: "Visit commerce",
      onClick: () => {
        window.open(process.env.REACT_APP_HOME_COMMERCE, "_blank");
      },
    },
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
          sx={{ position: "absolute", bottom: 32, right: 32 }}
          icon={<HomeRepairService />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={action.onClick}
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
