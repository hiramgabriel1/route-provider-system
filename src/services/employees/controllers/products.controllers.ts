import { Request, Response } from "express";
import productMarks from "../../../models/products.model";

class products {
  // ! dont take
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
      const isSold = queryProductID.find((sold) => sold.productIsSold);

      if (isSold) {
        return res.json({
          response: "el producto ya está marcado como vendido!",
          details: queryProductID,
        });
      }

      const markIsSold = await productMarks.findOneAndUpdate(
        { _id: productId },
        { $set: { productIsSold: true } },
        { new: true }
      );

      res.json({
        response: "marcado como vendido éxitosamente",
        details: markIsSold,
      });

      //   const isSoldProduct = queryProductID.filter((sold) => sold.productIsSold);
      //   //   const isUnsoldProduct = queryProductID.filter(
      //   //     (unsold) => unsold.productIsSold === false
      //   //   );

      //   // validate and send to response
      //   isSoldProduct
      //     ? res
      //         .status(200)
      //         .json({ response: "products solds", details: isSoldProduct })
      //     : res.status(500).json({ response: "error internal" });
    } catch (error) {
      console.error(error);
    }
  }

  async showProductsSolds(req: Request, res: Response) {
    try {
      const queryProductsMarkedSold = await productMarks.find({
        productIsSold: true,
      });

      queryProductsMarkedSold
        ? res.json({
            response: queryProductsMarkedSold,
            cantidad: queryProductsMarkedSold.length,
          })
        : res.status(404).json({ response: "not found" });
    } catch (error) {
      res.status(500).json({ response: "internal error" });
      console.error(error);
    }
  }

  async showProductsUnsolds(req: Request, res: Response) {
    try {
      const queryProductsMarkedUnsold = await productMarks.find({
        productIsSold: false,
      });

      queryProductsMarkedUnsold
        ? res.json({
            response: queryProductsMarkedUnsold,
            cantidad: queryProductsMarkedUnsold.length,
          })
        : res.status(404).json({ response: "not found" });
    } catch (error) {
      console.error(error);
    }
  }
}

export default products;
