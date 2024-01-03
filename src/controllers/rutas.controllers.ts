import { Request, Response } from "express";
import rutasModels from "../models/rutas.model";

class rutasController {
  async getRutas(req: Request, res: Response) {
    try {
      const rutas = await rutasModels.find();

      rutas
        ? res.status(200).json({ message: rutas, details: true })
        : res.status(404).json({ message: "No existen rutas", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async getRutaById(req: Request, res: Response) {
    try {
      const { rutaId } = req.params;

      const ruta = await rutasModels.findById(rutaId);

      ruta
        ? res.status(200).json({ message: ruta, details: true })
        : res.status(404).json({ message: "No existen rutas", details: false });
    } catch (error) {
      console.error(error);
    }
  }

  async editRuta(req: Request, res: Response) {
    try {
      const { rutaId } = req.params;
      const updateDataRuta = req.body;

      const updateUserData = await rutasModels.findOneAndUpdate(
        { _id: rutaId },
        { $set: updateDataRuta },
        { new: true }
      );

      updateDataRuta
        ? res.status(200).json({ message: updateDataRuta, details: true })
        : res.status(404).json({ message: "No existen rutas", details: false });
    } catch (error) {
      console.log(error);
    }
  }
  async createRuta(req: Request, res: Response) {
    try {
      const {
        empleado,
        vehicle,
        start,
        end,
        status,
        amountOfMerchandise,
        LastMinuteSale,
      } = req.body;

      const dataUser = {
        empleado: empleado,
        vehicle: vehicle,
        start: start,
        end: end,
        status: status,
        amountOfMerchandise: amountOfMerchandise,
        LastMinuteSale: LastMinuteSale,
      };

      // todo: verify data
      const isExists = await rutasModels.findOne({
        empleado: empleado,
        vehicle: vehicle,
        start: start,
        end: end,
        status: status,
        amountOfMerchandise: amountOfMerchandise,
        LastMinuteSale: LastMinuteSale,
      });

      isExists
        ? res.json({ message: "La ruta ya existe", details: dataUser })
        : false;

      const createRuta = await rutasModels.create(dataUser);

      createRuta
        ? res.status(200).json({ message: "Ruta creada exitosamente" })
        : res.status(500).json({ message: "No se logró crear la ruta" });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRutas(req: Request, res: Response) {
    try {
      const { idRuta } = req.params;

      const deleteRuta = await rutasModels.findByIdAndDelete(idRuta);

      deleteRuta
        ? res.status(200).json({
            message: "Deleted successfully!",
            details: deleteRuta,
            response: true,
          })
        : res
            .status(404)
            .json({ messageError: "Delete error", details: false });
    } catch (error) {
      console.error(error);
    }
  }
}

export default rutasController;
