import { Request, Response } from "express"

class homeController {
    // constructor(parameters) {
        
    // }
    async getDataParams(req: Request, res: Response){
        try {
            res.json({ username: "Victor Jímenez" })                
        } catch (error) {
            console.error(error)
        }
    }

}

export default homeController