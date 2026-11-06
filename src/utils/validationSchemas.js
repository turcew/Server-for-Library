const yup = require("yup");

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().trim().min(2).max(30).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  nationality: yup.string().trim().min(2).required("Nationality is required"),
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().trim().min(2).max(50).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone")
    .nullable(),
  password: yup.string().min(4).required("Password is required"),
});

const BOOK_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().min(1).max(255).required("Title is required"),
  genre: yup.string().trim().min(2).required("Genre is required"),
  shelf: yup.string().trim().min(2).required("Shelf is required"),
  description: yup.string().trim().nullable(),
  image: yup.string().trim().nullable(),
});

module.exports = {
  AUTHOR_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
  BOOK_VALIDATION_SCHEMA,
};
