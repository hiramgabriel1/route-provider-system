import { Request, Response } from "express";
import requestProductsMarks from "../models/requestProducts.model";
import productMarks from "../models/products.model";
import { ProductsInRequest } from "../interfaces/interface";

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


      console.log(products)
     

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
          stateProduct:prod.stateProduct,
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
      let productToUpdate = request.products.find((prod) => prod.product?.equals(productId));
      // console.log("request:")
      // console.log(request)
      // console.log("\nroductToUpdate:")
      // console.log(productToUpdate)
      console.log("\nupdateData:")
      console.log({ ...productToUpdate, ...updateData })

        // Encuentra el índice del producto dentro del array 'products'
        const productIndex = request.products.findIndex(product => product._id && product._id.equals(productId));
      
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

  async deleteRequestByRuta(ruta:String,res:Response){
    try{
      const idRuta= ruta;

      const deleted= await requestProductsMarks.deleteMany({
        route:idRuta
      });

      if(deleted.deletedCount){
        return true;
      }
      return false;
      
    }catch(error){
      return res.status(500).json({error: "error interno del servidor" });
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
      const { requestProductId, productId } = req.params

      const request = await requestProductsMarks.findById(requestProductId);
      if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }

      // Almacenamos en productIndex el producto que va a ser identico(id) al que viene por params
      const productIndex = request.products.findIndex(product => product._id && product._id.equals(productId.toString()));

      if (productIndex === -1) {
        return res.status(404).json({ error:"Producto no encontrado" })
      }

     const removeProduct = request.products.splice(productIndex, 1);

      await request.save(); // Guardaríamos la request actualizada

      return res.status(200).json({ 
        message: "Producto eliminado exitosamente", 
        details: removeProduct,
        response: true })


    } catch(err) {
      return res.status(500).json({ error: "error interno del servidor" });
    } 
  }

  async aprovedRequest(req: Request, res: Response) {
      try {
        const aprovedRequest = await requestProductsMarks.find(
          { state: "aprobado" }
        )
        if (aprovedRequest) {
          res.status(200).json({ message: aprovedRequest })
        } else {
          res.status(404).json({ error: "Solicitud no encontrada" })
        }
        
        

      } catch(error) {
        res.status(500).json({ error: "error interno del servidor" })
      }
  }

  async addProductToRequest(req:Request,res:Response){
    try {
       const {idRequest} = req.params;
       const {product}= req.body;

       const request= await requestProductsMarks.findById(idRequest);

       if(!request){
        return res.status(404).json({message:"not found", details:false});
       }

       const productos= request.products;

       productos.push(product);

       await request.save();

       res.status(200).json({message:"product created", details:true})
    } catch (error) {
      console.log()
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
