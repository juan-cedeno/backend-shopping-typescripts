const { request, response } = require("express");
const Products = require("../model/products");

const cretateProduct = (req = request, res = response) => {
  try {
    const products = new Products(req.body);

    products.save();

    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const getProduct = async (req = request, res = response) => {
  try {
    const products = await Products.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const getProductById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const productsId = await Products.findById(id);

    if (!productsId) {
      return res.status(404).json({
        message: "no id",
      });
    }

    res.status(200).json(productsId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const editProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const productId = await Products.findById(id);

    if (!productId) {
      return res.status(404).json({ message: "no id" });
    }

    const newProduct = req.body;

    const productEdit = await Products.findByIdAndUpdate(id, newProduct, {
      new: true,
    });

    res.json(productEdit);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const deletedproduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const productId = await Products.findById(id);

    if (!productId) {
      return res.status(404).json({
        message: "no id",
      });
    }

    await Products.findByIdAndDelete(id);

    res.status(200).json({ ok: "true" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

module.exports = {
  cretateProduct,
  getProduct,
  getProductById,
  editProduct,
  deletedproduct,
};
