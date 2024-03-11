import { Request, Response } from "express";
import productMarks from "../../../models/products.model";

class products {

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

      return res.json({
        response: "marcado como vendido éxitosamente",
        details: markIsSold,
      });

    } catch (error) {
      res.status(500).json({ responseError: error })
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
        : res.status(404).json({ response: "product not found" });
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

  async scanProduct(req:Request,res:Response){
    try{
      const {idproduct} = req.params
      const productScan = await productMarks.findOne({productId:idproduct})

      productScan
      ? res.status(200).json({productScan, details:true})
      : res.status(400).json({response:"No se ha encontrado el producto en la base de datos", details:false})
    }catch(error){
      console.error(error);
    }
  }
}

export default products;
