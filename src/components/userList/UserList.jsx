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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../services/apiServices";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const { accessToken } = useSelector((state) => state.admin);
  useEffect(() => {
    const getUsers = async () => {
      const resp = await fetchUsers(accessToken);
      setUsersList(resp);
    };
    getUsers();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" margin="0.65rem">
        <Typography fontWeight="600">
          Total users: {usersList.length}
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
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.length === 0 ? (
              <CircularProgress />
            ) : (
              <>
                {usersList.map((user) => {
                  return <Row user={user} key={user._id} />;
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Row = ({ user }) => {
  const { firstName, lastName, email, phone, address } = user;
  return (
    <>
      <TableRow>
        <TableCell align="center">
          {firstName} {lastName}
        </TableCell>
        <TableCell align="center">{email}</TableCell>
        <TableCell align="center">{phone}</TableCell>
        <TableCell align="center">{address[0].substring(0, 25)}</TableCell>
        <TableCell align="center">
          <Box width="100%" display="flex">
            <Button size="small">Reset Pass</Button>
            <Button size="small" color="warning" variant="outlined">
              Ban
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserList;
