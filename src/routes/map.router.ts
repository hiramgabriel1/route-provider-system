import { Request, Response, Router } from "express";
import cacheInit from "../middlewares/cache.config";
import mapCotroller from "../controllers/map.controller";

const mapController = new mapCotroller()
const rotuerMap= Router();
const path = "/api/v1";


rotuerMap.get(
    `${path}/map/:routeID`,
    (req:Request,res:Response)=>{
        mapController.showMap(req,res);
    }
)