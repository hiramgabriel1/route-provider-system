import { Request, Response } from "express";
import unitModel from "../models/units.model";

class unitCarsController {
  async getCarsUnit(req: Request, res: Response) {
    try {
      const renderCarUnits = await unitModel.find();

      renderCarUnits
        ? res.status(200).json({ message: renderCarUnits, details: true })
        : res.status(500).json({ messageError: "error", details: false });
    } catch (error) {
      console.error(error);
    }
  }

  async createCarUnit(req: Request, res: Response) {
    try {
      const { marca, modelo, lastOilChange, nextOilChange } = req.body;

      const dataCarUnitReceived = {
        marca: marca,
        modelo: modelo,
        lastOilChange: lastOilChange,
        nextOilChange: nextOilChange,
      };

      const saveUnitCarInDatabase = await unitModel.create(dataCarUnitReceived);

      saveUnitCarInDatabase
        ? res
          .status(200)
          .json({ message: saveUnitCarInDatabase, details: true })
        : res
          .status(500)
          .json({ messageError: "error internal", details: false });
    } catch (error) {
      console.error(error);
    }
  }

  async modifyUnitCar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const carUnitModify = req.body;

      const modifyUnit = await unitModel.findByIdAndUpdate(
        { _id: id },
        { $set: carUnitModify },
        { new: true }
      );

      modifyUnit
        ? res
          .status(200)
          .json({ message: "modify data successfully!", details: modifyUnit })
        : res.status(404).json({ message: "error", details: false });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCarUnit(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteUnitById = await unitModel.findByIdAndDelete(id);

      deleteUnitById
        ? res.status(200).json({ message: "deleted", detials: deleteUnitById })
        : res
          .status(404)
          .json({ messageError: "error internal", details: false });
    } catch (error) {
      console.error(error);
    }
  }
}


export default unitCarsController;