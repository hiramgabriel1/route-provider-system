import creditStoreModel from "../models/credits.model";
import { Request, Response } from "express";

class creditStore {
  async searchStore(storeName: string, res: Response, _req: Request) {
    try {
      const queryStore = await creditStoreModel.findOne({ storeName });
      if (!queryStore)
        return res.json({ message: "no hay ninguna tienda con ese nombre" });

      return res.json({ message: "ya existe", details: queryStore });
    } catch (error) {
      throw new Error("Error al buscar la tienda: " + error);
    }
  }

  async addCreditToNewStore(req: Request, res: Response) {
    try {
      const { storeName, credit } = req.body;
      const queryStore = await creditStoreModel.findOne({ storeName });
      if (queryStore)
        return res.json({ message: "ya existe", details: queryStore });

      const storeCreditBody = {
        storeName: storeName,
        credit: credit,
      };

      const createCreditStore = await creditStoreModel.create(storeCreditBody);
      if (!createCreditStore) res.json({ message: "credit store error" });

      return res.json({
        message: createCreditStore,
        details: storeCreditBody,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Hubo un error al agregar el crédito a la tienda" });
    }
  }

  async showCreditStoreByName(req: Request, res: Response) {
    try {
      const { nameStore } = req.params;
      const query = await creditStoreModel.findOne({ storeName: nameStore });

      if (!query) {
        return res
          .status(404)
          .json({ message: "No se encontró ninguna tienda con ese nombre" });
      }

      return res.json(query);
    } catch (error) {
      console.error("Error al buscar la tienda:", error);
      return res.status(500).json({ message: "Error al buscar la tienda" });
    }
  }

  async showAllStores(req: Request, res: Response) {
    try {
      res.json(await creditStoreModel.find());
    } catch (error) {
      return res.json(error);
    }
  }

  async editCreditStore(req: Request, res: Response) {
    try {
      const { storeName } = req.params;
      const newBodyToCreditStore = req.body;
      const findNameStore = await creditStoreModel.findOne({
        storeName: storeName,
      });

      if (!findNameStore)
        return res.json("No existe la tienda que quieres modificar");

      const update = await creditStoreModel.findByIdAndUpdate(
        findNameStore._id,
        { $set: newBodyToCreditStore },
        { new: true }
      );

      if (update) {
        return res.json({
          message: "Tienda actualizada",
          details: update,
        });
      } else {
        return res.json("No se actualizó la tienda");
      }
    } catch (error) {
      console.error("Error al editar la tienda:", error);
      return res.status(500).json({ message: "Error al editar la tienda" });
    }
  }

  async deleteCreditStore(req: Request, res: Response) {
    try {
      const { storeName } = req.params;
      const deletedStore = await creditStoreModel.findOneAndDelete({
        storeName,
      });

      if (!deletedStore) {
        return res
          .status(404)
          .json({ message: "No se encontró ninguna tienda con ese nombre" });
      }

      return res.json({
        message: "Tienda eliminada correctamente",
        deletedStore,
      });
    } catch (error) {
      console.error("Error al eliminar la tienda:", error);
      return res.status(500).json({ message: "Error al eliminar la tienda" });
    }
  }
}

export default creditStore;
