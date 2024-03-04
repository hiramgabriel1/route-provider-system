import { Request, Response } from "express";
import requestProductsMarks from "../models/requestProducts.model";
import productMarks from "../models/products.model";

interface ProductRequest {
  productId: string;
  amount: number;
}

class requestProductsController {
  async getAllRequestProducts(req: Request, res: Response) {
    try {
      const requestAll = await requestProductsMarks.find();
      console.log(requestAll);
      if (requestAll) res.status(200).json({ details: requestAll });
    } catch (err) {
      console.log(err);
    }
  }

  async createRequestProducts(req: Request, res: Response) {
    try {
      const {
        employee,
        products,
      }: { employee: string; products: ProductRequest[] } = req.body;

      const productsExist = await productMarks.find({
        _id: { $in: products.map((prod) => prod.productId) },
      });

      if (productsExist.length !== products.length)
        return res
          .status(400)
          .json({ error: "Al menos un producto no existe" });
      const newRequest = new requestProductsMarks({
        employee: employee,
        products: products.map((prod) => ({
          product: prod.productId,
          amount: prod.amount,
        })),
      });

      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async removeRequestProduct(req: Request, res: Response) {
    try {
      console.log("lol");
      const { requestProductId } = req.params;
      console.log(requestProductId);
      const deleteProduct = await requestProductsMarks.findByIdAndDelete(
        requestProductId
      );

      deleteProduct
        ? res.status(200).json({
            message: "deleted successfully!",
            details: deleteProduct,
            response: true,
          })
        : res
            .status(404)
            .json({ messageError: "deleted error", details: false });
    } catch (err) {
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }
}

export default requestProductsController;




//Example
// {
//   "employee": "65bd6be8c372708d150c594d",
//   "products":[
//       {
//           "productId":"65ce73e864ac7951337b94ba",
//           "amount": 20
//       },
//       {
//           "productId":"65ce74caab642c2e22db91cc",
//           "amount": 12
//       },
//       {
//           "productId":"65ce7580ab642c2e22db91d8",
//           "amount": 15
//       },
//       {
//           "productId":"65ce76adab642c2e22db91ef",
//           "amount": 5
//       }
//   ]
// }