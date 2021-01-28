const express = require("express");
const { check } = require("express-validator");
const {
  cretateProduct,
  getProduct,
  getProductById,
  editProduct,
  deletedproduct,
} = require("../controllers/product");
const { validateCamp } = require("../middlewares/validate-camp");
const { ValidateToken } = require("../middlewares/validate-token");

const routers = express.Router();

routers.post(
  "/product",
  [
    check("name", "Name is required").not().isEmpty(),
    check("image", "Image is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    validateCamp,
    ValidateToken,
  ],
  cretateProduct
);

routers.get("/product", getProduct);
routers.get("/product/:id", [ValidateToken], getProductById);
routers.put("/product/:id", [ValidateToken], editProduct);
routers.delete("/product/:id", [ValidateToken], deletedproduct);

module.exports = routers;
