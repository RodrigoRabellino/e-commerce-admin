import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import { useState, useEffect } from "react";
import { fetchCategories, updateProduct } from "../../services/apiServices";
import { useSelector } from "react-redux";

const EditProductForm = ({ product, handleSetProduct, handleClose }) => {
  const { _id, name, description, price, stock, categoryId, starred } = product;
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState(product.categoryId);
  const [ErrorCategory, setErrorCategory] = useState(false);
  const admin = useSelector((state) => state.admin);
  const handleChangeCategory = (newValue) => {
    setErrorCategory(false);
    setCatSelected(categories.find((category) => category._id === newValue.id));
  };

  useEffect(() => {
    const getCategories = async () => {
      const resp = await fetchCategories();
      setCategories(resp);
    };
    getCategories();
  }, []);

  const handleSubmit = async (values) => {
    values.categoryId = catSelected._id;
    const resp = await updateProduct(_id, admin.accessToken, values);
    if (Object.entries(resp).length !== 0) handleSetProduct(resp);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      description: description,
      price: price,
      stock: stock,
      categoryId: categoryId,
      starred: starred,
      createdBy: admin._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  if (categories.length === 0) return <CircularProgress />;
  return (
    <Box width="500px">
      <Typography textAlign="center" fontWeight="600" fontSize="20px">
        New Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          id="name"
          label="Product Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <Box display="flex" justifyContent="space-between" paddingTop="1rem">
          <TextField
            fullWidth
            type="number"
            variant="standard"
            id="price"
            label="Product price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <Box width="2rem"></Box>
          <TextField
            fullWidth
            type="number"
            variant="standard"
            id="stock"
            label="Product stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
        </Box>

        <FormControl fullWidth sx={{ marginTop: "1rem" }}>
          <InputLabel id="categoryId">Category</InputLabel>

          <Select
            variant="standard"
            id="categoryId"
            label="Category"
            error={ErrorCategory}
            value={catSelected._id}
            onChange={(e, newValue) => handleChangeCategory(newValue.props)}
          >
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category._id}
                  value={category._id}
                  id={category._id}
                >
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
          {ErrorCategory ? <Typography>Error</Typography> : <></>}
        </FormControl>

        <TextField
          variant="standard"
          fullWidth
          id="description"
          label="Product description"
          value={formik.values.description}
          onChange={formik.handleChange}
          multiline
          rows={6}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box display="flex" marginTop="1rem">
          <Button sx={{ width: "100%" }} type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProductForm;
