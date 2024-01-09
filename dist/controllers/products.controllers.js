"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = __importDefault(require("../models/products.model"));
class productsController {
    async getProducts(req, res) {
        try {
            const products = await products_model_1.default.find();
            products
                ? res.status(200).json({ message: products, details: true })
                : res.status(500).json({
                    messageError: "error internal brother, de pana xd",
                    details: false,
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await products_model_1.default.findById({ productId });
            product
                ? res.status(200).json({ message: product, details: true })
                : res.status(500).json({
                    messageError: "the product does not exist",
                    details: false,
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    async editProduct(req, res) {
        try {
            const { productId } = req.params;
            const updateFiledsDataProduct = req.body;
            const updateProduct = await products_model_1.default.findByIdAndUpdate({ _id: productId }, { $set: updateFiledsDataProduct }, { new: true });
            updateProduct
                ? res.status(200).json({ response: "product edit successfully", message: updateProduct, details: true })
                : res
                    .status(404)
                    .json({ messageError: "error internal", details: false });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createProduct(req, res) {
        try {
            const { productName, productDescription, productPrice, productIsSold } = req.body;
            const dataProduct = {
                productName: productName,
                productDescription: productDescription,
                productPrice: productPrice,
                productIsSold: productIsSold,
            };
            const isExists = await products_model_1.default.findOne({
                productName: productName,
                productDescription: productDescription,
                productPrice: productPrice,
                productIsSold: productIsSold,
            });
            if (isExists) {
                return res.json({
                    message: "the product already exists",
                    details: dataProduct,
                });
            }
            const createProduct = await products_model_1.default.create(dataProduct);
            createProduct
                ? res.status(200).json({ message: "product created" })
                : res.status(500).json({ message: "product could not be created" });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(req, res) {
        try {
            const { productId } = req.params;
            const deleteProduct = await products_model_1.default.findByIdAndDelete(productId);
            deleteProduct
                ? res.status(200).json({
                    message: "deleted successfully!",
                    details: deleteProduct,
                    response: true,
                })
                : res
                    .status(404)
                    .json({ messageError: "deleted error", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = productsController;
