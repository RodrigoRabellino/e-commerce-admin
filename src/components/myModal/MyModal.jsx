import { Modal, Box } from "@mui/material";

const MyModal = ({ open, handleClose, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    backgroundColor: "#ffffff",
    boxShadow: 0,
    p: 4,
    paddingY: "1rem",
    borderRadius: "15px",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default MyModal;
