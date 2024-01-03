import { Request, Response } from "express";
import rutasModels from "../models/rutas.model";

class mapController{
    async showMap(req: Request, res: Response) {
        try {
            const { routeID } = req.params;  
            const ruta = await rutasModels.findById(routeID);

            ruta
        ? res.status(200).json({start:ruta.start,end:ruta.end})
        : res.status(500).json({
            messageError: "No existe la ruta",
            details: false,
          });
      
          
        } catch (error) {
          console.error(error);

        }
      }
      
}

export default mapController