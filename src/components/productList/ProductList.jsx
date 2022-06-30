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
  toggleShowInProduct,
  toggleStarredProduct,
} from "../../services/apiServices";
import MySnackBar from "../snackBar/MySnackBar";
import MyModal from "../myModal/MyModal";
import EditProductList from "../editProductForm/EditProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [severitySnack, setSeveritySnack] = useState("");
  const { accessToken } = useSelector((state) => state.admin);
  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const handleOpenModal = (product) => {
    setProductToEdit(product);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => setOpenSnack(false);

  const handleSnack = (message, severity) => {
    setMessageSnack(message);
    setSeveritySnack(severity);
    handleOpenSnack();
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchAllProducts(accessToken);
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
            }}
          >
            <TableRow>
              <TableCell align="center">
                <Typography fontWeight="600">Total:</Typography>
                <Typography fontWeight="600">{products.length}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "60px" }}>
                <Checkbox
                  value={checkAll}
                  onChange={() => setCheckAll((prev) => !prev)}
                />
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
          <TableBody>
            {products.length === 0 ? (
              <CircularProgress />
            ) : (
              <>
                {products.map((product) => {
                  const cat = categories.find(
                    (category) => category._id === product.categoryId
                  );
                  return (
                    <Row
                      checkAll={checkAll}
                      productRow={product}
                      key={product._id}
                      category={cat}
                      handleSnack={handleSnack}
                      handleModal={handleOpenModal}
                    />
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MyModal handleClose={handleCloseModal} open={openModal}>
        <EditProductList product={productToEdit} />
      </MyModal>
      <MySnackBar
        handleClose={handleCloseSnack}
        open={openSnack}
        message={messageSnack}
        severity={severitySnack}
      />
    </Box>
  );
};

const Row = ({ checkAll, productRow, category, handleSnack, handleModal }) => {
  const [product, setProduct] = useState(productRow);
  const { name, price, starred, stock, show, _id } = product;
  const { accessToken } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleSetStarred = async () => {
    const response = await toggleStarredProduct(_id, accessToken);
    setProduct(response);
  };
  const handleToggleShow = async () => {
    const response = await toggleShowInProduct(_id, accessToken);
    setProduct(response);
  };
  const handleDelete = () => {
    handleSnack("this function is not available now", "warning");
  };

  return (
    <>
      <TableRow
        sx={
          isSelected
            ? {
                backgroundColor: "rgb(169,255,228, 0.55)",
              }
            : {}
        }
      >
        <TableCell align="center" sx={{ width: "60px" }}>
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
            onClick={handleToggleShow}
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
            <IconButton onClick={() => handleModal(product)}>
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
        <Box display="flex" justifyContent="space-evenly">
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
