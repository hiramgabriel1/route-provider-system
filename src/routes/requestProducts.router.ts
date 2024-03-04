import { Request, Response, Router } from "express";
import requestProductsController from "../controllers/requestProducts.controllers";

const controllerRequestProducts = new requestProductsController()
const routerRequestProducts = Router()
const path = "/api/v1";

routerRequestProducts.get(`${path}/request-products/`, (req:Request, res:Response)=>{
    controllerRequestProducts.getAllRequestProducts(req, res)
})
routerRequestProducts.post(`${path}/request-products/add`, (req:Request, res:Response)=>{
    controllerRequestProducts.createRequestProducts(req, res)
    
})
routerRequestProducts.delete(`${path}/request-products/remove/:requestProductId`, (req:Request, res:Response)=>{
    console.log("lol")
    controllerRequestProducts.removeRequestProduct(req, res)
   
})

export default routerRequestProducts;
