import {
  Box,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputLabel,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import { useState, useEffect } from "react";
import { fetchCategories, postNewProduct } from "../../services/apiServices";
import MySnackBar from "../snackBar/MySnackBar";
import { useSelector } from "react-redux";

const NewProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState({});
  const [ErrorCategory, setErrorCategory] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const admin = useSelector((state) => state.admin);

  const handleCloseSnack = () => setOpenSnack(false);
  const handleOpenSnack = (message) => {
    setSnackMessage(message);
    setOpenSnack(true);
  };

  const handleChangeCategory = (newValue) => {
    setErrorCategory(false);
    setCatSelected(newValue);
  };

  useEffect(() => {
    const getCategories = async () => {
      const resp = await fetchCategories();
      setCategories(resp);
    };
    getCategories();
  }, []);

  const handleSubmit = async (values) => {
    if (catSelected === "1") return setErrorCategory(true);

    values.categoryId = catSelected.value;
    const resp = await postNewProduct(values);
    console.log(resp);
    handleOpenSnack(values.name + " created");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      imgUrl: "",
      price: 1,
      stock: 1,
      categoryId: "",
      starred: false,
      createdBy: admin._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

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
        <TextField
          type="number"
          variant="standard"
          fullWidth
          id="price"
          label="Product price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          type="number"
          variant="standard"
          fullWidth
          id="stock"
          label="Product stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />
        <FormControl fullWidth sx={{ marginTop: "1rem" }}>
          <InputLabel id="categoryId">Category</InputLabel>
          <Select
            variant="standard"
            id="categoryId"
            label="Category"
            error={ErrorCategory}
            value={catSelected.value}
            onChange={(e, newValue) => handleChangeCategory(newValue.props)}
          >
            {categories.map((category, i) => {
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
        <TextField
          variant="standard"
          fullWidth
          id="imgUrl"
          label="ImgUrl"
          value={formik.values.imgUrl}
          onChange={formik.handleChange}
          error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
          helperText={formik.touched.imgUrl && formik.errors.imgUrl}
        />
        <Box display="flex" marginTop="1rem">
          <IconButton color="primary">
            <Clear />
          </IconButton>
          <Button sx={{ width: "100%" }} type="submit">
            Save
          </Button>
        </Box>
      </form>
      <MySnackBar
        open={openSnack}
        handleClose={handleCloseSnack}
        message={snackMessage}
      />
    </Box>
  );
};

export default NewProductForm;
