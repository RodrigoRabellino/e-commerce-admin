import {
  Delete,
  Edit,
  KeyboardArrowUp,
  KeyboardArrowRight,
  Category,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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
import EditProductForm from "../editProductForm/EditProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [severitySnack, setSeveritySnack] = useState("info");
  const { accessToken } = useSelector((state) => state.admin);

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
  }, [accessToken]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box display="flex" marginBottom="0.65rem">
        <Typography fontWeight="600">
          Total orders: {products.length}
        </Typography>
      </Box>
      <TableContainer component={Box}>
        <Table aria-label="product table">
          <TableHead
            sx={{
              backgroundColor: "rgb(0,0,0, 0.22)",
            }}
          >
            <TableRow>
              <TableCell align="center" />
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
              <TableCell align="center">Visibility</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <>
                <Box
                  sx={{
                    width: "100%",
                    paddingY: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </>
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <Row
                      checkAll={checkAll}
                      productRow={product}
                      key={product._id}
                      handleSnack={handleSnack}
                    />
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <MySnackBar
        handleClose={handleCloseSnack}
        open={openSnack}
        message={messageSnack}
        severity={severitySnack}
      />
    </Box>
  );
};

const Row = ({ checkAll, productRow, handleSnack }) => {
  const [product, setProduct] = useState(productRow);
  const { name, price, starred, stock, show, _id, categoryId } = product;
  const { accessToken } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseSnack = () => setOpenSnack(false);

  const handleSetProduct = (product) => {
    setSnackMessage(`Product ${product.name.substring(0, 10)} updated`);
    setOpenSnack(true);
    setProduct(product);
  };

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
                backgroundColor: "rgb(169,255,228, 0.22)",
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
            {categoryId.name}
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

        <Tooltip title={isSelected ? "" : "Select row for edit"}>
          <TableCell align="right">
            <Switch
              checked={starred}
              disabled={!isSelected}
              onChange={handleSetStarred}
            />
          </TableCell>
        </Tooltip>
        <Tooltip title={isSelected ? "" : "Select row for edit"}>
          <TableCell align="center">
            <Switch
              color="secondary"
              checked={show}
              disabled={!isSelected}
              onChange={handleToggleShow}
            />
          </TableCell>
        </Tooltip>

        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <IconButton onClick={handleOpenModal}>
              <Edit />
            </IconButton>
            <IconButton disabled={!isSelected} onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <ItemDesc open={open} product={product} />
        </TableCell>
      </TableRow>
      <MyModal handleClose={handleCloseModal} open={openModal}>
        <EditProductForm
          product={product}
          handleClose={handleCloseModal}
          handleSetProduct={handleSetProduct}
        />
      </MyModal>
      <MySnackBar
        open={openSnack}
        handleClose={handleCloseSnack}
        message={snackMessage}
      />
    </>
  );
};

const ItemDesc = ({ open, product }) => {
  const { name, createdAt, createdBy, description, imgUrl } = product;
  const { accessToken } = useSelector((state) => state.admin);
  const [createdName, setCreatedName] = useState("");

  useEffect(() => {
    const getAdminById = async () => {
      const resp = await fetchAdminById(createdBy, accessToken);
      setCreatedName(`${resp.firstName} ${resp.lastName}`);
    };
    getAdminById();
  }, [accessToken, createdBy]);

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
            const imageUrl = process.env.REACT_APP_IMAGE_HOSTING_URL + image;
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
                  srcSet={imageUrl}
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
