import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import { useState, useEffect } from "react";
import { fetchCategories, postNewProduct } from "../../services/apiServices";
import { useSelector } from "react-redux";
import { supabase } from "../../services/supabaseServices";
import { LoadingButton } from "@mui/lab";

const NewProductForm = ({ handleOpenSnack }) => {
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState({
    value: "62bf16449a945cb3238bc9b9",
  });
  const [uploadImage, setUploadImage] = useState(false);
  const [ErrorCategory, setErrorCategory] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [errorUpload, setErrorUpload] = useState("");

  const admin = useSelector((state) => state.admin);

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

  const handleSubmit = async (values, resetForm) => {
    if (catSelected === "1") return setErrorCategory(true);
    values.categoryId = catSelected.value;
    values.imgUrl = [...imageList];

    const resp = await postNewProduct(values, admin.accessToken);
    console.log(resp);
    resetForm();
    handleOpenSnack(`${values.name} created`);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 1,
      stock: 1,
      categoryId: "",
      starred: false,
      createdBy: admin._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
  });

  const uploadFile = async (files) => {
    setErrorUpload("");

    const totalFiles = Object.entries(files).length;
    if (totalFiles > 3)
      return setErrorUpload("Pleas, only 3 images per product");
    setUploadImage(true);
    try {
      for (let i = 0; i < totalFiles; i++) {
        const { data, error } = await supabase.storage
          .from("products")
          .upload(
            `/${files[i].lastModified}-${files[i].name.substring(0, 7)}`,
            files[i]
          );
        if (error) {
          setUploadImage(false);
          return setErrorUpload("this images already exist");
        }
        console.log(data.Key.split("/")[1]);
        setImageList((prev) => [...prev, data.Key.split("/")[1]]);
      }
    } catch (error) {
      console.log(error);
    }
    setUploadImage(false);
  };

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
          sx={{ mt: "1rem" }}
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
        <Box mt="1rem">
          <input
            type="file"
            accept="image/*"
            multiple
            id="file_upload"
            name="file_upload"
            onChange={(e) => uploadFile(e.target.files)}
          />
          <Box>
            {errorUpload.length === 0 ? (
              <></>
            ) : (
              <Typography sx={{ color: "red" }}>{errorUpload}</Typography>
            )}
          </Box>
        </Box>

        <Box display="flex" marginTop="1rem">
          <LoadingButton
            sx={{ width: "100%" }}
            type="submit"
            disabled={uploadImage}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default NewProductForm;
