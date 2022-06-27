import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { fetchAdminById, fetchProducts } from "../../services/apiServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };
    getProducts();
  }, []);
  console.log(products);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100wh",
      }}
    >
      <TableContainer component={Box}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Starred</TableCell>
              <TableCell align="center"> Actions</TableCell>
            </TableRow>
          </TableHead>

          {products.length === 0 ? (
            <CircularProgress />
          ) : (
            <TableBody>
              <Row product={products[0]} />
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

const Row = ({ product }) => {
  const { name, categoryId, price, starred, stock } = product;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Checkbox />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell align="right">{categoryId}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="right">{stock}</TableCell>
        <TableCell align="right">
          <Switch checked={starred} />
        </TableCell>
        <TableCell align="center">
          <Box>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
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
    </>
  );
};

const ItemDesc = ({ open, product }) => {
  const { name, createdAt, createdBy, description, imgUrl, _id } = product;
  const admin = useSelector((state) => state.admin);
  useEffect(() => {
    const getAdminById = async () => {
      const resp = await fetchAdminById(_id, admin.accessToken);
      console.log(resp);
    };
    getAdminById();
  }, []);

  return (
    <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
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
          <Typography variant="overline">Created at: {createdAt}</Typography>
          <Typography variant="overline" marginLeft="0.65rem">
            by: {createdBy}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          {imgUrl.map((image) => {
            return (
              <Box sx={{ with: "100px", height: "100px" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
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
