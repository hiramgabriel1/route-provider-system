import { Request, Response } from "express"
import rutasModels from "../models/rutas.model"

class rutasController{

    async getRutas(req:Request,res:Response){
        try{
            const rutas = await rutasModels.find();
            
            if(rutas){
                res.status(200).json({messaje:rutas, details:true})
            }else{
                res.status(404).json({messaje:"No existen rutas", details:false})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async getRutaById(req: Request, res: Response) {
        try {
          const { rutaId } = req.params;

          const ruta = await rutasModels.findById(rutaId);

          if(ruta){
            res.status(200).json(ruta)
          }else{
            res.status(404).json({message:'La ruta no existe'})
          }
        } catch (error) {
          console.error(error);
        }
      }

      async editRuta(req:Request, res:Response){
            try{
                const {rutaId}= req.params
                const updateDataRuta= req.body;
                
                const updateUserData = await rutasModels.findOneAndUpdate(
                    { _id: rutaId },
                    { $set: updateDataRuta },
                    { new: true }
                  );

                  if(updateUserData){
                    res.status(200).json({ message: updateUserData, details: true })
                  }else{
                    res.status(404).json({ messageError: "error internal", details: false });
                  }
            }catch (error) {
            console.log(error);
            }
    }
    async createRuta(req: Request, res: Response) {
        try {
          const { empleado, vehicle, start, end, status, amountOfMerchandise, LastMinuteSale } = req.body;
    
          const dataUser = {
            empleado : empleado ,
            vehicle : vehicle,
            start : start,
            end:end,
            status:status,
            amountOfMerchandise: amountOfMerchandise,
            LastMinuteSale:LastMinuteSale
        
          };
    
          // todo: verify data
          const isExists = await rutasModels.findOne({
            empleado : empleado ,
            vehicle : vehicle,
            start : start,
            end:end,
            status:status,
            amountOfMerchandise: amountOfMerchandise,
            LastMinuteSale:LastMinuteSale
          });
    
          if (isExists) {
            return res.json({ message: "la ruta ya éxiste", details: dataUser });
          }
    
          const createRuta = await rutasModels.create(dataUser);
    
          if(createRuta){
            res.status(200).json({ message: "ruta creada éxitosamente" })
          }else{
            res.status(500).json({ message: "no se logró crear la ruta" });
          }
        } catch (error) {
          console.error(error);
        }
      }


    async deleteRutas(req: Request, res: Response) {
        try {
          const { idRuta } = req.params;
    
          const deleteRuta = await rutasModels.findByIdAndDelete(idRuta);
    
          if(deleteRuta){

            res.status(200).json({message: "deleted successfully!",details: deleteRuta,response: true,})

            }else{ 

                res.status(404).json({ messageError: "deleted error", details: false });
            }
        } catch (error) {
          console.error(error);
        }
      }

}

export default rutasController;