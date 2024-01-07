import { Request, Response } from "express";

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

      // const userInfo = { } // información del empleado al que se le quiere ver la info --> { username, vehicleAssignament, stateRoute },

      // const products = // productos que el empleado marcó como vendidos --> desc, cantidad, precio y que productos fueron en un PDF
      // const productsNotBuy = // productos que el empleado  marcó como NO vendidos --> desc, cantidad y precio

      // const estimatedPrices = //descripción de --> salió con "$16mil pesos", vendió "$13400 pesos", entregó en efectivo "$5mil pesos", entregó en mercancia "$900 pesos"

      // const differenceCount = // la diferencia de dinero es "$10 pesos"
      
    } catch (error) {
      console.error(error);
    }
  }
}

export default systemBroker;
