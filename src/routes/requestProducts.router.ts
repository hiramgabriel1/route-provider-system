import { Request, Response, Router } from "express";
import requestProductsController from "../controllers/requestProducts.controllers";

const controllerRequestProducts = new requestProductsController()
const routerRequestProducts = Router()
const path = "/api/v1";

routerRequestProducts.get(`${path}/request-products/`, (req:Request, res:Response)=>{
    controllerRequestProducts.getAllRequestProducts(req, res)
})
routerRequestProducts.get(`${path}/request-product/user/:requestProductId`, (req:Request, res:Response)=>{
    controllerRequestProducts.getUniqueRequestProductByUser(req, res)
})
routerRequestProducts.post(`${path}/request-products/add`, (req:Request, res:Response)=>{
    controllerRequestProducts.createRequestProducts(req, res)
    
})
routerRequestProducts.delete(`${path}/request-products/remove/:requestProductId`, (req:Request, res:Response)=>{
    controllerRequestProducts.removeRequestProduct(req, res)
   
})
routerRequestProducts.patch(`${path}/request-products/edit/:requestProductId`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateRequestProduct(req, res)
   
})

export default routerRequestProducts;
