import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { productMarks } from "../services/employees/models/products";
import { ErrorReply } from "redis";
import rutasModels from "../models/rutas.model";
import rutasController from "./rutas.controllers";
import unitModel from "../models/units.model";
import requestProductsMarks from "../models/requestProducts.model";
import { model } from "mongoose";
// import { createFileInventary } from "../services/employees/utils/pdf-create";
// import pdf from "html-pdf";

class systemBroker {
  async viewHistoryCourt(req: Request, res: Response) {
    try {

      const products = await productMarks.find();
      const queryUserInfo = await employeeModel.find();

      const filterSoldProducts: any = products.filter(
        (productsBuy) => productsBuy.productIsSold === true
      );
      const filterUnsoldProducts = products.filter(
        (unsoldProducts) => unsoldProducts.productIsSold === false
      );
      const filterProductsPrices = products.filter(
        (productPrices) => productPrices.productPrice
      );

      let totalPriceProducts = 0;
      products.forEach((product) => {
        totalPriceProducts += product.productPrice ?? 0;
      });

      // !! diferencia terminar
      return queryUserInfo
        ? res.status(200).json({
          response: "found",
          userInfo: queryUserInfo,
          productosVendidos: filterSoldProducts,
          countProductsSolds: filterSoldProducts.length,
          productosNoVendidos: filterUnsoldProducts,
          countProductsUnsolds: filterUnsoldProducts.length,
          estimatedPrices: filterProductsPrices,
        })
        : res.status(404).json({ response: "not found" });

      // const userInfo = { } // información del empleado al que se le quiere ver la info --> { username, vehicleAssignament, stateRoute },

      // const products = // productos que el empleado marcó como vendidos --> desc, cantidad, precio y que productos fueron en un PDF
      // const productsNotBuy = // productos que el empleado  marcó como NO vendidos --> desc, cantidad y precio

      // todo

      // const estimatedPrices = //descripción de --> salió con "$16mil pesos", vendió "$13400 pesos", entregó en efectivo "$5mil pesos", entregó en mercancia "$900 pesos"

      // const differenceCount = // la diferencia de dinero es "$10 pesos"
    } catch (error) {
      console.error(error);
      res.status(500).json({ responseError: error, details: false });
    }
  }


 async closeCourt(req: Request, res: Response) {
  try { 
    
    const { rutaId } = req.params;

    const ruta = await rutasModels.findById(rutaId);

    if(!ruta) {
      return res.status(404).json({ response: "route not found" });
    }
    

    const { _id, empleado, vehicle } = ruta;

    const employee = await employeeModel.findOne({ _id: empleado });

    if(!employee) {
      return res.status(404).json({ response: "employee not found" });
    }
    // nombre y apellido del empleado;
    const user = employee.user;

    const vehiculo = await unitModel.findOne({ _id: vehicle });

    if(!vehiculo) {
      return res.status(404).json({ response: "vehicle not found" });
    }

    const { marca, modelo } = vehiculo;

    const requestProducts = await requestProductsMarks.findOne({ route: _id });

    if(!requestProducts) {
      return res.status(404).json({ response: "request product not found" });
    }

    const { products } = requestProducts;

    // filtros

    const ProductsSold: any = products.filter(
      (product) => product.stateProduct === 'vendido'
    );


    const ProductsIsNotSold: any = products.filter(
      (product) => product.stateProduct === 'no vendido'
    );


    const ProductDevolution: any = products.filter(
      (product) => product.stateProduct === 'devolucion'
    );

    const ObjectData = {
      id_Ruta: _id,
      Usuario: user,
      Marca: marca,
      Modelo: modelo,
      ProductosVendidos: ProductsSold,
      ProductosNoVendidos: ProductsIsNotSold,
      ProductosDevueltos: ProductDevolution
    };

    res.status(200).json({ response: ObjectData })

  } catch(error) {
    res.status(500).json({ response: error })
  }
 }

}

export default systemBroker;
