import { Request, Response } from "express";
import { productMarks } from "../models/products.model";

class productsController {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productMarks.find();

      products
        ? res.status(200).json({ message: products, details: true })
        : res.status(500).json({
            messageError: "error internal brother, de pana xd",
            details: false,
          });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const product = await productMarks.findById({ productId });

      product
        ? res.status(200).json({ message: product, details: true })
        : res.status(500).json({
            messageError: "the product does not exist",
            details: false,
          });
    } catch (error) {
      console.log(error);
    }
  }

  async editProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const updateFiledsDataProduct = req.body;

      const updateProduct = await productMarks.findByIdAndUpdate(
        { _id: productId },
        { $set: updateFiledsDataProduct },
        { new: true }
      );
      updateProduct
        ? res.status(200).json({ message: updateProduct, details: true })
        : res
            .status(404)
            .json({ messageError: "error internal", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { nombre, descripcion, precio } = req.body;

      const dataProduct = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
      };

      const isExists = await productMarks.findOne({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
      });

      if (isExists) {
        return res.json({
          message: "the product already exists",
          details: dataProduct,
        });
      }

      const createProduct = await productMarks.create(dataProduct);

      createProduct
        ? res.status(200).json({ message: "product created" })
        : res.status(500).json({ message: "product could not be created" });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const deleteProduct = await productMarks.findByIdAndDelete(productId);

      deleteProduct
        ? res.status(200).json({
            message: "deleted successfully!",
            details: deleteProduct,
            response: true,
          })
        : res
            .status(404)
            .json({ messageError: "deleted error", details: false });
    } catch (error) {
      console.error(error);
    }
  }
}

export default productsController;
