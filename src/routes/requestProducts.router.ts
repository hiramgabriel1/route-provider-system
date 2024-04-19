import { Request, Response, Router } from "express";
import requestProductsController from "../controllers/requestProducts.controllers";
import { GeoReplyWith } from "redis";

const controllerRequestProducts = new requestProductsController()
const routerRequestProducts = Router()
const path = "/api/v1";

routerRequestProducts.get(`${path}/request-products/`, (req:Request, res:Response)=>{
    controllerRequestProducts.getAllRequestProducts(req, res)
})
routerRequestProducts.get(`${path}/request-product/route/:requestRouteId`, (req:Request, res:Response)=>{
    controllerRequestProducts.getUniqueRequestProductByRoute(req, res)
})

routerRequestProducts.get(`${path}/request-products/aproved`, (req, res) => {
    controllerRequestProducts.aprovedRequest(req, res)
})

routerRequestProducts.get(`${path}/request-products/aproved/:requestRouteId`, (req:Request, res:Response) => {
    controllerRequestProducts.getUniqueRequestProductAprovedByRoute(req, res);
})

routerRequestProducts.post(`${path}/request-products/add`, (req:Request, res:Response)=>{
    controllerRequestProducts.createRequestProducts(req, res)
    
})
routerRequestProducts.post(`${path}/request-products/addproduct/:idRequest`, (req:Request, res:Response)=>{
    controllerRequestProducts.addProductToRequest(req, res)
    
})

routerRequestProducts.delete(`${path}/request-products/remove/:requestProductId`, (req:Request, res:Response)=>{
    controllerRequestProducts.removeRequestProduct(req, res)
   
})

routerRequestProducts.delete(`${path}/request-products/remove/:requestProductId/:productId`, (req:Request,res:Response) => {
    controllerRequestProducts.removeProductRequest(req, res)
})

routerRequestProducts.patch(`${path}/request-products/edit/:requestProductId`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateRequestProduct(req, res)
})

routerRequestProducts.patch(`${path}/request-products/update-acepted/:idRequest`, (req, res) => {
    controllerRequestProducts.updateAcepted(req, res)
})
routerRequestProducts.patch(`${path}/request-products/update-to-acepted/:idRequest`, (req, res) => {
    controllerRequestProducts.updateToAcepted(req, res)
})
routerRequestProducts.patch(`${path}/request-products/edit/:requestProductId/:productId`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateRequestOneProduct(req, res)
})

routerRequestProducts.patch(`${path}/request-products/remplaceproducts/:idRequest`, (req:Request, res:Response)=>{
    controllerRequestProducts.rempleaceProducts(req, res)
})


routerRequestProducts.patch(`${path}/request-products/update/ammountdispatched/:idRequest`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateAmmountDispatched(req, res);
})
routerRequestProducts.patch(`${path}/request-products/update/ammountsold/:idRequest`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateAmmountSold(req, res);
})
routerRequestProducts.patch(`${path}/request-products/update/ammountreturn/:idRequest`, (req:Request, res:Response)=>{
    controllerRequestProducts.updateAmmountReturn(req, res);
})



export default routerRequestProducts;
