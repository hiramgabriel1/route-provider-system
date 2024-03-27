import { Request, Response, response } from "express";
import rutasModels from "../models/rutas.model";
import requestProductsController from "./requestProducts.controllers";

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
      res.status(500).json({ response: "error internal" });
      console.error(error);
    }
  }
  async getRutaByUserId(req: Request, res: Response) {
    try {
      const { rutaUserId } = req.params;

      const ruta = await rutasModels.find({empleado: rutaUserId});

      ruta
        ? res.status(200).json({ message: ruta, details: true })
        : res.status(404).json({ message: "No existen rutas", details: false });
    } catch (error) {
      res.status(500).json({ response: "error internal" });
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

      updateUserData
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
        tiendas,
        status,
        amountOfMerchandise,
        LastMinuteSale,
      } = req.body;

      const dataUser = {
        empleado: empleado,
        vehicle: vehicle,
        tiendas:tiendas,
        status: status,
        amountOfMerchandise: amountOfMerchandise,
        LastMinuteSale: LastMinuteSale,
      };

      // todo: verify data
      const isExists = await rutasModels.findOne({
        empleado,
        vehicle,
        tiendas,
        status,
        amountOfMerchandise,
        LastMinuteSale,
      });

      if (isExists) {
        return res.json({ message: "La ruta ya existe", details: dataUser });
      }

      const createRuta = await rutasModels.create(dataUser);

      if (createRuta) {
        return res.status(200).json({ message: "Ruta creada exitosamente" });
      } else {
        return res.status(500).json({ message: "No se logró crear la ruta" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error en el servidor",
        details: error,
      });
    }
  }

  async deleteRutas(req: Request, res: Response) {
    try {
        const { rutaId } = req.params;

        // Eliminar la ruta
        const ruta = await rutasModels.findByIdAndDelete(rutaId);

        if (ruta) {
            const ControllerRequestProducts = new requestProductsController();

            // Pasar el ID de la ruta como cadena de texto
            const deleted = await ControllerRequestProducts.deleteRequestByRuta(rutaId.toString(), res);

            deleted
            ?res.status(200).json({ message: "La ruta y las solicitudes asociadas fueron eliminadas exitosamente." })
            :res.status(404).json({ message: "No se encontraron solicitudes asociadas a la ruta." });
            
        } else {
            res.status(404).json({ message: "No se encontró la ruta para eliminar." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

async addProductToRuta(rutaId: any, products: any,req:Request,res:Response) {
  try {
    const ruta = await rutasModels.findById(rutaId);

    if (ruta) {
      const productsRuta = ruta.productsAccepted.concat(products); // Crear un nuevo array con los productos añadidos
      ruta.productsAccepted = productsRuta; // Asignar el nuevo array a la propiedad productsAccepted
      await ruta.save(); // Guardar los cambios en la ruta
      res.status(200).json({message:"product añadidos",details:true})
    } else {
      res.status(404).json({message:"no se encontro la ruta",details:true})
    }
  } catch (error) {
    res.status(400).json({message:"internal server error",details:true})
  }
}

  
 }



export default rutasController;
