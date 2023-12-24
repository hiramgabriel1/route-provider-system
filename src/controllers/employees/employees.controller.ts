import { Request, Response } from "express"
import employeeModel from "../../models/employees.model"

class employees {
    async getEmployees(req: Request, res: Response){
        try {
            
        } catch (error) {
            console.error(error)
        }
    }

    async getEmployeeById(req: Request, res: Response){
        try {
            const { id_employee } = req.params


        } catch (error) {
            console.error(error)
        }
    }

    async editEmployee(req: Request, res: Response){
        try {
            
        } catch (error) {
            console.error(error)
        }
    }

    async createEmployee(req: Request, res: Response){
        try {
            const { user, username, lastnames, role, password } = req.body

            const dataUser = { 
                user: user,
                username: username,
                lastnames: lastnames,
                role: role,
                password: password
            }

            // todo: verify data
            const isExists = await employeeModel.findOne({ 
                user: dataUser.user,
                password: dataUser.password 
            })

            if(isExists){
                return res.json({ message: "el usuario ya éxiste", details: dataUser }) 
            }

            const createUser = await employeeModel.create(dataUser)
            
            createUser
                ? res.status(200).json({ message: "creado éxitosamente" })
                : res.status(500).json({ message: "no se logró guardar usuario" })

        } catch (error) {
            console.error(error)
        }
    }

    async deleteEmployee(req: Request, res: Response){
        try {
            
        } catch (error) {
            console.error(error)
        }
    }
}

export default employees