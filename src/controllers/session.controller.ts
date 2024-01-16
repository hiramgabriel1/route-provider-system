import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { verifyPasswordSecurity } from "../validators/bcrypt.config";

class sessionController {
  async validateSessionInput(req: Request, res: Response) {
    try {
        const { username, role, password } = req.body;
        const verifySessionAndTypeRole = await employeeModel.find({
            username: username,
            role: role,
        });

        if (verifySessionAndTypeRole.length > 0) {
            const isValid = password === verifySessionAndTypeRole[0].password;

            if (isValid) {
                res.status(200).json({ message: "user found", response: verifySessionAndTypeRole });
            } else {
                res.status(400).json({ message: "Incorrect password", details: false });
            }
        } else {
            res.status(400).json({ message: "User not found", details: false });
        }
    } catch (error) {
        res.status(500).json({ messageError: error });
        console.error(error);
    }
}

}

export default sessionController;
