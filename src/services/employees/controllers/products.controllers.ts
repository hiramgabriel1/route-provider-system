import { Request, Response } from "express";
import productMarks from "../../../models/products.model";

class products {
  async createProduct(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async markProductIsSold(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      console.log(productId);

      // ? query db to find data product
      const queryProductID = await productMarks.find({ _id: productId });
      const isSoldProduct = queryProductID.filter(sold => sold.productIsSold === true)

      res.json(isSoldProduct)
    } catch (error) {
      console.error(error);
    }
  }

  async productsSolds(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async productsUnsolds(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

export default products;
