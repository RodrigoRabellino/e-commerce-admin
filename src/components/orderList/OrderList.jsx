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
import { Bathtub, PestControlRodent, Shower } from "@mui/icons-material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrders, fetchUsers } from "../../services/apiServices";
const OrderList = () => {
  const [ordersList, setOrdersList] = useState([]);
  const { accessToken } = useSelector((state) => state.admin);
  const [orderSelected, setorderSelected] = useState(0);

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
                  return <Row order={order} key={order._id} />;
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

const Row = ({ order }) => {
  const { userId, createdAt, status, totalPrice } = order;
  return (
    <>
      <TableRow>
        <TableCell align="center">
          {format(new Date(createdAt), "dd/MM/yyyy-HH:mm")}
        </TableCell>
        <TableCell align="center">{`${userId.firstName} ${userId.lastName}`}</TableCell>
        <TableCell align="center">{userId.email}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{totalPrice}</TableCell>
        <TableCell align="center">
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <IconButton size="small">
              <PestControlRodent />
            </IconButton>
            <IconButton size="small">
              <Bathtub />
            </IconButton>
            <IconButton size="small">
              <Shower />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderList;
