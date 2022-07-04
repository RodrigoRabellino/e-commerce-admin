import {
  TableRow,
  Box,
  TableContainer,
  TableHead,
  TableCell,
  Typography,
  CircularProgress,
  TableBody,
  Button,
  Table,
  IconButton,
} from "@mui/material";
import {
  Bathtub,
  LocalShipping,
  PestControlRodent,
  Print,
  Shower,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchOrders,
  fetchUsers,
  shippingOrder,
} from "../../services/apiServices";

const OrderList = ({ handleOpenSnack }) => {
  const [ordersList, setOrdersList] = useState([]);
  const { accessToken } = useSelector((state) => state.admin);

  useEffect(() => {
    const getOrders = async () => {
      const resp = await fetchOrders(accessToken);
      console.log(resp);
      setOrdersList(resp);
    };
    getOrders();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" margin="0.65rem">
        <Typography fontWeight="600">
          Total orders: {ordersList.length}
        </Typography>
      </Box>
      <TableContainer component={Box}>
        <Table aria-label="users table">
          <TableHead
            sx={{
              backgroundColor: "rgb(0,0,0, 0.22)",
            }}
          >
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">User email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Updated at</TableCell>
              <TableCell align="center">U$S</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList.length === 0 ? (
              <>
                <Typography>Nothing To see</Typography>
              </>
            ) : (
              <>
                {ordersList.map((order) => {
                  return (
                    <Row
                      orderRow={order}
                      key={order._id}
                      handleOpenSnack={handleOpenSnack}
                    />
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box></Box>
    </Box>
  );
};

const Row = ({ orderRow, handleOpenSnack }) => {
  const [order, setOrder] = useState(orderRow);
  const { accessToken } = useSelector((store) => store.admin);
  const { userId, createdAt, updatedAt, status, totalPrice, _id } = order;

  const handleShipping = async () => {
    if (status === "shipped")
      return handleOpenSnack("This order already shipped", "warning");
    const resp = await shippingOrder(_id, accessToken);
    handleOpenSnack(`Order ${_id} shipped`, "success");
    setOrder(resp);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">
          {format(new Date(createdAt), "dd/MM/yyyy-HH:mm")}
        </TableCell>
        <TableCell align="center">{`${userId.firstName} ${userId.lastName}`}</TableCell>
        <TableCell align="center">{userId.email}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">
          {format(new Date(updatedAt), "dd/MM/yyyy-HH:mm")}
        </TableCell>
        <TableCell align="center">{totalPrice}</TableCell>
        <TableCell align="center">
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <Button
              size="small"
              color="warning"
              onClick={() =>
                handleOpenSnack("This function is not enabled", "warning")
              }
            >
              Cancel
            </Button>
            <Button size="small" onClick={handleShipping}>
              <LocalShipping /> Ship
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleOpenSnack("Coming soon!", "info")}
            >
              <Print />
              Print
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderList;
