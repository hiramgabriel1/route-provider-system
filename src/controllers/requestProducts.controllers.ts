import { Request, Response } from "express";
import requestProductsMarks from "../models/requestProducts.model";
import productMarks from "../models/products.model";
import { ProductsInRequest } from "../interfaces/interface";
import rutasController from "./rutas.controllers";
import {
  ProductInRequestProductsInterface,
  RequestProductsInterface,
} from "../types/requestProducts";
import products from "../services/employees/controllers/products.controllers";

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
      const requestAll = await requestProductsMarks.find({
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
        products: ProductsInRequest[];
        state: string;
        dateTime: string;
      } = req.body;

      console.log(products);

      const productsExist = await productMarks.find({
        _id: { $in: products.map((prod) => prod.product) },
      });

      if (productsExist.length !== products.length)
        return res
          .status(400)
          .json({ error: "Al menos un producto no existe" });
      const newRequest = await requestProductsMarks.create({
        route: route,
        state: state,
        dateTime: dateTime,
        products: products.map((prod) => ({
          product: prod.product,
          amount: prod.amount,
          amountCurrent: prod.amount,
          stateProduct: prod.stateProduct,
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

      // Validar que updateData contenga los campos necesarios
      if (!updateData || !updateData.amount || !updateData.amountCurrent) {
        return res.status(400).json({ error: "Faltan datos de actualización" });
      }

      const request = await requestProductsMarks.findById(requestProductId);
      if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }
      let productToUpdate = request.products.find((prod) =>
        prod.product?.equals(productId)
      );
      // console.log("request:")
      // console.log(request)
      // console.log("\nroductToUpdate:")
      // console.log(productToUpdate)
      console.log("\nupdateData:");
      console.log({ ...productToUpdate, ...updateData });

      // Encuentra el índice del producto dentro del array 'products'
      const productIndex = request.products.findIndex(
        (product) => product._id && product._id.equals(productId)
      );

      if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      // @ts-ignore
      productToUpdate = { ...productToUpdate, ...updateData };

      // Actualiza los campos 'amount' y 'amountCurrent' del producto
      request.products[productIndex].amount = updateData.amount;
      request.products[productIndex].amountCurrent = updateData.amountCurrent;

      // Guarda el documento actualizado
      const updatedRequest = await request.save();

      return res.status(200).json({ message: updatedRequest, details: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteRequestByRuta(ruta: String, res: Response) {
    try {
      const idRuta = ruta;

      const deleted = await requestProductsMarks.deleteMany({
        route: idRuta,
      });

      if (deleted.deletedCount) {
        return true;
      }
      return false;
    } catch (error) {
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async removeRequestProduct(req: Request, res: Response) {
    try {
      const { requestProductId } = req.params;
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

  async removeProductRequest(req: Request, res: Response) {
    try {
      const { requestProductId, productId } = req.params;

      const request = await requestProductsMarks.findById(requestProductId);
      if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }

      // Almacenamos en productIndex el producto que va a ser identico(id) al que viene por params
      const productIndex = request.products.findIndex(
        (product) => product._id && product._id.equals(productId.toString())
      );

      if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      const removeProduct = request.products.splice(productIndex, 1);

      await request.save(); // Guardaríamos la request actualizada

      return res.status(200).json({
        message: "Producto eliminado exitosamente",
        details: removeProduct,
        response: true,
      });
    } catch (err) {
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async aprovedRequest(req: Request, res: Response) {
    try {
      const aprovedRequest = await requestProductsMarks.find({
        state: "aprobado",
      });
      if (aprovedRequest) {
        res.status(200).json({ message: aprovedRequest });
      } else {
        res.status(404).json({ error: "Solicitud no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async getUniqueRequestProductAprovedByRoute(req: Request, res: Response) {
    try {
      const { requestRouteId } = req.params;

      const aprovedRequest = await requestProductsMarks.findOne({
        state: "aprobado",
        route: requestRouteId,
      });

      if (aprovedRequest) {
        res.status(200).json({ message: aprovedRequest, details: true });
      } else {
        res
          .status(404)
          .json({ error: "Solicitud no encontrada", details: false });
      }
    } catch (error) {
      res.status(500).json({ error: "error interno en el servidor" });
    }
  }

  async addProductToRequest(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const { product } = req.body;

      const request = await requestProductsMarks.findById(idRequest);

      if (!request) {
        return res.status(404).json({ message: "not found", details: false });
      }

      const productos = request.products;

      productos.push(product);

      await request.save();

      res.status(200).json({ message: "product created", details: true });
    } catch (error) {
      console.log();
    }
  }

  async rempleaceProducts(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const products = req.body;

      const requestToUpdate = await requestProductsMarks.findById(idRequest);
      console.log(requestToUpdate, idRequest);

      if (!requestToUpdate) {
        return res.status(404).json({ message: "request no encontrada." });
      }

      requestToUpdate.products = products;

      await requestToUpdate.save();

      return res.status(200).json({
        message: "Productos rempleazadon en la request exitosamente.",
      });
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  async updateAcepted(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const updateData = req.body;

      const updateRequest = await requestProductsMarks.findByIdAndUpdate(
        { _id: idRequest },
        { $set: updateData },
        { new: true }
      );

      console.log(updateRequest);

      if (updateRequest) {
        const productIds = updateRequest.products.map(
          (product) => product.product
        );
        //todo bien
        const controllerRutas = new rutasController();
        controllerRutas.addProductToRuta(
          updateRequest.route,
          productIds,
          req,
          res
        );
      } else {
        // Manejar el caso donde no se encuentra la solicitud
        res.status(404).json({ error: "Solicitud no encontrada" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  concatProductsInRequest(
    arr1: ProductInRequestProductsInterface[],
    arr2: ProductInRequestProductsInterface[]
  ) {
    const mapa: { [id: string]: ProductInRequestProductsInterface } = {};

    arr1.forEach((obj: ProductInRequestProductsInterface) => {
      const productId =
        //@ts-ignore
        typeof obj.product === "object" ? obj.product.toString() : obj.product;
      mapa[productId] = {
        ...obj,
        amount: (mapa[productId]?.amount || 0) + obj.amount,
        amountCurrent:
          (mapa[productId]?.amountCurrent || 0) + obj.amountCurrent,
      } as ProductInRequestProductsInterface;
    });

    arr2.forEach((obj) => {
      const productId =
        //@ts-ignore
        typeof obj.product === "object" ? obj.product.toString() : obj.product;

      mapa[productId] = {
        ...obj,
        amount: (mapa[productId]?.amount || 0) + obj.amount,
        amountCurrent:
          (mapa[productId]?.amountCurrent || 0) + obj.amountCurrent,
      } as ProductInRequestProductsInterface;
    });

    const result = Object.keys(mapa).map(
      (id) => mapa[id] as ProductInRequestProductsInterface
    );

    return result;
  }

  async updateToAcepted(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const updateData = req.body as RequestProductsInterface;

      // const updateRequest = await requestProductsMarks.findByIdAndUpdate(
      //   { _id: idRequest },
      //   { $set: updateData },
      //   { new: true }
      // );

      const updateRequestInFather = await requestProductsMarks.findOne({
        route: updateData.route,
        state: "aprobado",
      });

      if (updateRequestInFather) {
        // aumentar en el que existe
        const updateRequestInFatherConvert =
          // @ts-ignore
          updateRequestInFather as RequestProductsInterface;

        const updateReq = await requestProductsMarks.findByIdAndUpdate(
          { _id: updateRequestInFather._id },
          {
            $set: {
              products: this.concatProductsInRequest(
                updateRequestInFatherConvert.products,
                updateData.products || []
              ),
            },
          },
          { new: true }
        );

        if (updateReq) {
          const updateReq = await requestProductsMarks.findByIdAndDelete(
            idRequest
          );
          return res.status(200).json({
            message: updateReq,
          });
        }
      } else {
        const updateReqToNew = await requestProductsMarks.findByIdAndUpdate(
          { _id: updateData._id },
          { $set: { ...updateData, state: "aprobado" } },
          { new: true }
        );
        if (!updateReqToNew) {
          throw new Error("No se ha creado el padre correctamente");
        }

        return res.status(200).json({
          message: updateReqToNew,
        });
      }

      // console.log(updateData);

      // if (updateData) {
      //   const productIds = updateData.products.map(
      //     (product) => product.product
      //   );
      //   //todo bien
      //   const controllerRutas = new rutasController();
      //   controllerRutas.addProductToRuta(
      //     updateData.route,
      //     productIds,
      //     req,
      //     res
      //   );
      // } else {
      //   // Manejar el caso donde no se encuentra la solicitud
      //   res.status(404).json({ error: "Solicitud no encontrada" });
      // }

      // const deleteRequest = await requestProductsMarks.findByIdAndDelete(
      //   requestProductId
      // );

      return res.status(200).json({
        message: "Productos rempleazadon en la request exitosamente.",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "error interno del servidor" });
    }
  }

  async updateAmmountDispatched(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const { productId, ammountDispatched } = req.body;

      const request = await requestProductsMarks.findById(idRequest);

      if (!request) {
        return res
          .status(404)
          .json({ message: "Request not found", details: false });
      }

      const indexProduct = request.products.findIndex(
        (product) => product._id?.toString() === productId
      );

      if (indexProduct === -1) {
        return res
          .status(404)
          .json({ message: "Product not found", details: false });
      }

      // Accede al objeto productStateDSR
      const productStateDSR = request.products[indexProduct].productStateDSR[0];

      // Asigna el valor de ammountDispatched
      if (productStateDSR) {
        productStateDSR.ammountDispatched = ammountDispatched;
      }

      await request.save();

      return res
        .status(200)
        .json({
          message: "Ammount dispatched updated successfully",
          details: true,
        });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async updateAmmountSold(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const { productId, ammountSold } = req.body;

      const request = await requestProductsMarks.findById(idRequest);

      if (!request) {
        return res
          .status(404)
          .json({ message: "Request not found", details: false });
      }

      const indexProduct = request.products.findIndex(
        (product) => product._id?.toString() === productId
      );

      if (indexProduct === -1) {
        return res
          .status(404)
          .json({ message: "Product not found", details: false });
      }

      // Accede al objeto productStateDSR
      const productStateDSR = request.products[indexProduct].productStateDSR[0];

      // Asigna el valor de ammountSold
      if (productStateDSR) {
        productStateDSR.ammountSold = ammountSold;
      }

      await request.save();

      return res
        .status(200)
        .json({
          message: "Ammount dispatched updated successfully",
          details: true,
        });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async updateAmmountReturn(req: Request, res: Response) {
    try {
      const { idRequest } = req.params;
      const { productId, ammountReturn } = req.body;

      const request = await requestProductsMarks.findById(idRequest);

      if (!request) {
        return res
          .status(404)
          .json({ message: "Request not found", details: false });
      }

      const indexProduct = request.products.findIndex(
        (product) => product._id?.toString() === productId
      );

      if (indexProduct === -1) {
        return res
          .status(404)
          .json({ message: "Product not found", details: false });
      }

      // Accede al objeto productStateDSR
      const productStateDSR = request.products[indexProduct].productStateDSR[0];

      // Asigna el valor de ammountDispatched
      if (productStateDSR) {
        productStateDSR.ammountReturn = ammountReturn;
      }

      await request.save();

      return res
        .status(200)
        .json({
          message: "Ammount dispatched updated successfully",
          details: true,
        });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", details: false });
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
