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

        const isValid =
            verifySessionAndTypeRole.length > 0
                ? password === verifySessionAndTypeRole[0].password
                : false;

        isValid
            ? res.status(200).json({ message: "user found", response: verifySessionAndTypeRole })
            : res.status(400).json({ message: "User not found or incorrect password", details: false });
    } catch (error) {
        res.status(500).json({ messageError: error });
        console.error(error);
    }
}


}

export default sessionController;
