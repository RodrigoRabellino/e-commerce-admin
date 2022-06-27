import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux/es/exports";
import { logOutAdmin } from "../../redux/admin/slice";

const AdminMain = () => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Typography>Holiwi</Typography>
      <Button onClick={() => dispatch(logOutAdmin())}>LogOut</Button>
    </Box>
  );
};

export default AdminMain;
