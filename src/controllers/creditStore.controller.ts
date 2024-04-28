import creditStoreModel from "../models/credits.model";
import { Request, Response } from "express";

class creditStore {
  async searchStore(storeName: string) {
    try {
      // Usamos findOne del modelo de Mongoose
      const queryStore = await creditStoreModel.findOne({ storeName });
      if (!queryStore)
        return { message: "no hay ninguna tienda con ese nombre" };
      return queryStore; // Devolvemos el documento encontrado
    } catch (error) {
      throw new Error("Error al buscar la tienda: " + error);
    }
  }

  addCreditToNewStore(req: Request, res: Response) {
    try {
      // const { storeName, credit } = req.body;
      // const store = await this.searchStore(storeName);

      return {
        message: `Se agregó crédito a la tienda`,
      };
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Hubo un error al agregar el crédito a la tienda" });
    }
  }

  async showCreditStoreByName(req: Request, res: Response) {
    // Implementa la lógica para mostrar la tienda por nombre
  }

  async editCreditStore(req: Request, res: Response) {
    // Implementa la lógica para editar la tienda
  }

  async deleteCreditStore(req: Request, res: Response) {
    // Implementa la lógica para eliminar la tienda
  }
}

export default creditStore