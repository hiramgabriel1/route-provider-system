import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { productMarks } from "../services/employees/models/products";

class systemBroker {
  async closeCourt(req: Request, res: Response) {
    try {
      // const {  }
    } catch (error) {
      console.error(error);
    }
  }

  async viewHistoryCourt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log("id input: " + id);

      // interface Product {
      //   productFinish: boolean
      // }

      const products = await productMarks.find();
      const queryUserInfo = await employeeModel.find({ _id: id });

      // const filterProductsByFinish = (products: Product[], isProductFinish: Product[]) =>
      //   products.filter((product: any) => product.productFinish === isProductFinish);

      // // ? filter products sold and not solds!
      // const filterSoldProducts = filterProductsByFinish(products, true);
      // const filterUnsoldProducts = filterProductsByFinish(products, false);

      const filterSoldProducts = products.filter(
        (productsBuy) => productsBuy.productFinish === true
      );
      const filterUnsoldProducts = products.filter(
        (unsoldProducts) => unsoldProducts.productFinish === false
      );
      const filterProductsPrices = products.filter(
        (productPrices) => productPrices.productPrice
      );

      // const totalPrice = filterProductsPrices.reduce((accumulator, product) => {
      //   return accumulator + product.productPrice;
      // }, 0);

      // diferencia terminar

      queryUserInfo
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
    }
  }
}

export default systemBroker;
