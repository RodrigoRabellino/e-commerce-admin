import * as yup from "yup";
export const validationSchema = yup.object({
  name: yup
    .string("enter a valid name")
    .min(5)
    .max(50)
    .required("Name is required"),
  description: yup
    .string("enter a valid desc")
    .min(5)
    .max(200)
    .required("Desc is required"),
  imgUrl: yup.string("enter a valid Url").required("url is required").min(5),
  price: yup.number("price is number").min(1),
  stock: yup.number("stock is number").min(1),
  createdBy: yup.string("enter a valid created"),
});
