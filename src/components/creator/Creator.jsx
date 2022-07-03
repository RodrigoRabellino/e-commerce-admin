import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NewProductForm from "../newProductForm/NewProductForm";
import { useState, useEffect } from "react";
import { fetchCategories, postNewCategory } from "../../services/apiServices";
import { useSelector } from "react-redux";

const Creator = () => {
  const buttonStyle = {
    transition: "0.3s",
    width: "90%",
    height: "75px",
    transform: "translateX(-5px)",
    borderRadius: "0 10px 10px 0",
    ":hover": {
      transition: "0.3s",
      width: "95%",
    },
  };
  const buttonSelected = {
    ...buttonStyle,
    transform: "translateX(0px)",
    borderRadius: "0 5px 5px 0",
    width: "95%",
    ":hover": {
      transition: "0.3s",
      borderRadius: "0 5px 5px 0",
      width: "95%",
    },
  };
  const [formSelected, setFormSelected] = useState("newProduct");

  const getForm = (form) => {
    switch (form) {
      case "newProduct":
        return <NewProductForm />;
      case "newCategory":
        return <NewCategoryForm />;

      default:
        return <NewProductForm />;
    }
  };

  const items = [
    {
      label: "New Product",
      value: "newProduct",
    },
    {
      label: "New Category",
      value: "newCategory",
    },
    {
      label: "New Admin",
      value: "newAdmin",
    },
    {
      label: "Upload",
      value: "upload",
    },
    {
      label: "Download",
      value: "download",
    },
  ];

  return (
    <Box width="100%" height="100%" display="flex" paddingTop="1rem">
      <Stack spacing={2} sx={{ width: "200px" }}>
        {items.map((item) => {
          const { label, value } = item;
          return (
            <Button
              key={item.value}
              color={formSelected === value ? "secondary" : "primary"}
              onClick={() => setFormSelected(value)}
              variant="contained"
              disableElevation
              sx={formSelected === value ? buttonSelected : buttonStyle}
            >
              {label}
            </Button>
          );
        })}
      </Stack>
      <Box
        sx={{
          display: "flex",
          width: "95%",
          justifyContent: "center",
        }}
      >
        {getForm(formSelected)}
      </Box>
    </Box>
  );
};

const NewCategoryForm = () => {
  const admin = useSelector((state) => state.admin);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const resp = await fetchCategories();
      setExistingCategories(resp);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category.length < 3) return setError(true);

    const response = await postNewCategory(category, admin.accessToken);
    console.log(response);
  };

  const handleChange = (newValue) => {
    setError(false);
    setCategory(newValue);
  };

  return (
    <Box display="flex" padding="1rem">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography variant="h5" marginBottom="1rem">
          New Category
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          value={category}
          label="Category name"
          onChange={(e) => handleChange(e.target.value)}
          error={error}
        />
        <Button fullWidth variant="outlined" sx={{ mt: "1rem" }} type="submit">
          Save
        </Button>
      </form>

      <Box marginLeft="2rem">
        <Typography variant="h5" marginBottom="1rem">
          Existing Categories
        </Typography>

        {existingCategories.length === 0 ? (
          <CircularProgress />
        ) : (
          <>
            {existingCategories.map((category) => {
              return (
                <Typography textAlign="start" key={category._id}>
                  -{category.name}
                </Typography>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Creator;
