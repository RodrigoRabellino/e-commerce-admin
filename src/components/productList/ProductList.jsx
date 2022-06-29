import {
  Delete,
  Edit,
  KeyboardArrowUp,
  KeyboardArrowRight,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import {
  fetchAdminById,
  fetchCategories,
  fetchAllProducts,
} from "../../services/apiServices";
import MySnackBar from "../snackBar/MySnackBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [severirySnack, setSeverirySnack] = useState("");
  const { accessToken } = useSelector((state) => state.admin);

  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => setOpenSnack(false);

  const handleSnack = (message, severity) => {
    setMessageSnack(message);
    setSeverirySnack(severity);
    handleOpenSnack();
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchAllProducts(accessToken);
      console.log(response);
      setProducts(response);
    };
    const getCategories = async () => {
      const response = await fetchCategories();
      setCategories(response);
    };
    getProducts();
    getCategories();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <TableContainer component={Box}>
        <Table aria-label="product table">
          <TableHead
            sx={{
              backgroundColor: "rgb(0,0,0, 0.22)",
              height: "70px",
            }}
          >
            <TableRow>
              <TableCell sx={{ width: "60px" }} />
              <TableCell align="center" sx={{ width: "60px" }}>
                <Checkbox />
              </TableCell>
              <TableCell sx={{ width: "40%", overflow: "hidden" }}>
                Name
              </TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Starred</TableCell>
              <TableCell align="center">Show</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          {products.length === 0 ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {products.map((product) => {
                const cat = categories.find(
                  (category) => category._id === product.categoryId
                );
                return (
                  <Row
                    product={product}
                    key={product._id}
                    category={cat}
                    handleSnack={handleSnack}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <MySnackBar
        handleClose={handleCloseSnack}
        open={openSnack}
        message={messageSnack}
        severity={severirySnack}
      />
    </Box>
  );
};

const Row = ({ product, category, handleSnack }) => {
  const { name, price, starred, stock, show } = product;
  const { accessToken } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleSetStarred = () => {};
  const handleSetShow = () => {};
  const handleDelete = () => {
    handleSnack("this function is not available now", "warning");
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          align="center"
          sx={{ backgroundColor: "rgb(0,0,0, 0.22)", width: "60px" }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ width: "60px" }}>
          <Checkbox
            value={isSelected}
            onChange={() => setIsSelected((prev) => !prev)}
          />
        </TableCell>
        <TableCell sx={{ width: "40%", overflow: "hidden" }}>
          <Typography noWrap textOverflow="ellipsis">
            {name.substring(0, 50)} {name.length > 50 ? "..." : ""}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontWeight="600" noWrap textOverflow="ellipsis">
            {category.name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography noWrap textOverflow="ellipsis">
            {`U$S-${price}`}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography noWrap textOverflow="ellipsis">
            {stock}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Switch
            checked={starred}
            disabled={!isSelected}
            onChange={handleSetStarred}
          />
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            disabled={!isSelected}
            onClick={handleSetShow}
          >
            {show ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton disabled={!isSelected} onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <ItemDesc open={open} product={product} />
        </TableCell>
      </TableRow>
    </>
  );
};

const ItemDesc = ({ open, product }) => {
  const { name, createdAt, createdBy, description, imgUrl, _id } = product;
  const admin = useSelector((state) => state.admin);
  const [createdName, setCreatedName] = useState("");

  useEffect(() => {
    const getAdminById = async () => {
      const resp = await fetchAdminById(createdBy, admin.accessToken);
      setCreatedName(`${resp.firstName} ${resp.lastName}`);
    };
    getAdminById();
  }, []);

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box display="flex" flexDirection="column" width="100%" padding="1rem">
        <Box paddingTop="0.65rem">
          <Typography textAlign="center" variant="subtitle1" fontWeight="700">
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">{description}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" paddingTop="0.65rem">
          <Typography variant="overline">
            Created at: {format(new Date(createdAt), "dd/MM/yyyy")}
          </Typography>
          <Typography variant="overline" marginLeft="0.65rem">
            by: {createdName}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          {imgUrl.map((image) => {
            return (
              <Box
                key={image}
                sx={{
                  with: "100px",
                  height: "100px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  srcSet={image}
                  alt="product"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Collapse>
  );
};

export default ProductList;
