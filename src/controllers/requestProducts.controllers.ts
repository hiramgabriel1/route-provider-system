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
  async getUniqueRequestProductByRoute(req: Request, res: Response) {
    try {
      const { requestRouteId } = req.params;
      const requestAll = await requestProductsMarks.findOne({
        route: requestRouteId,
      });
      console.log(requestAll);
      if (requestAll) res.status(200).json({ details: requestAll });
      else res.status(200).json({ details: null });
    } catch (err) {
      res.status(400).json({ details: "not found" });
    }
  }

  async createRequestProducts(req: Request, res: Response) {
    try {
      const {
        route,
        products,
        state,
        dateTime,
      }: {
        route: string;
        products: ProductRequest[];
        state: string;
        dateTime: string;
      } = req.body;

      const productsExist = await productMarks.find({
        _id: { $in: products.map((prod) => prod.productId) },
      });

      if (productsExist.length !== products.length)
        return res
          .status(400)
          .json({ error: "Al menos un producto no existe" });
      const newRequest = new requestProductsMarks({
        route: route,
        state: state,
        dateTime: dateTime,
        products: products.map((prod) => ({
          product: prod.productId,
          amount: prod.amount,
          amountCurrent: prod.amount,
        })),
      });

      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async updateRequestProduct(req: Request, res: Response) {
    try {
      const { requestProductId } = req.params;
      const updateData = req.body;
      const updateRequest = await requestProductsMarks.findByIdAndUpdate(
        { _id: requestProductId },
        { $set: updateData },
        { new: true }
      );

      updateRequest
        ? res.status(200).json({
            message: "deleted successfully!",
            details: updateRequest,
            response: true,
          })
        : res
            .status(404)
            .json({ messageError: "deleted error", details: false });
    } catch (err) {
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }
  async updateRequestOneProduct(req: Request, res: Response) {
    try {
      const { requestProductId, productId } = req.params;
      const updateData = req.body;

      const request = await requestProductsMarks.findById(requestProductId);
      if (!request)
        return res.status(404).json({ error: "Solicitud no encontrada" });

      let productToUpdate = request.products.find((prod) => prod.product?.equals(productId));
      // console.log("request:")
      // console.log(request)
      // console.log("\nroductToUpdate:")
      // console.log(productToUpdate)
      console.log("\nupdateData:")
      console.log({ ...productToUpdate, ...updateData })


      if (!productToUpdate)
        return res
          .status(404)
          .json({ error: "Producto no encontrado en la solicitud" });

      // @ts-ignore
      productToUpdate = { ...productToUpdate, ...updateData };

      await request.save();

      return res.status(200).json({
        message: "update successfully!",
        details: request,
        response: true,
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async removeRequestProduct(req: Request, res: Response) {
    try {
      console.log("lol");
      const { requestProductId } = req.params;
      console.log(requestProductId);
      const deleteRequest = await requestProductsMarks.findByIdAndDelete(
        requestProductId
      );

      deleteRequest
        ? res.status(200).json({
            message: "deleted successfully!",
            details: deleteRequest,
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
//   "route": "65bd6be8c372708d150c594d",
//   "state": "pendiente" | "revisado" | "aprobado" | "rechazado"
//   "dateTime": "123m13m2m31k2" toIso
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
