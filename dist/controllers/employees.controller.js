"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesEmployees = exports.employees = void 0;
const employees_model_1 = __importDefault(require("../models/employees.model"));
const bcrypt_config_1 = require("../validators/bcrypt.config");
class employees {
    async getEmployees(req, res) {
        try {
            const renderData = await employees_model_1.default.find();
            const filterEmployees = renderData.filter((employee) => employee.role === "empleado");
            renderData
                ? res.status(200).json({ message: filterEmployees, details: true })
                : res.status(500).json({
                    messageError: "error internal brother, de pana xd",
                    details: false,
                });
        }
        catch (error) {
            console.error(error);
        }
    }
    async getEmployeeById(req, res) {
        try {
            const { employeeId } = req.params;
            // ? search if exists user by id
            const foundUserById = await employees_model_1.default.findById(employeeId);
            foundUserById
                ? res.status(200).json(foundUserById)
                : res.status(404).json({ messageError: "not found user de pana xd" });
        }
        catch (error) {
            console.error(error);
        }
    }
    async editEmployee(req, res) {
        try {
            const { id } = req.params;
            const updateFieldsDataEmployee = req.body;
            const updateUserData = await employees_model_1.default.findOneAndUpdate({ _id: id }, { $set: updateFieldsDataEmployee }, { new: true });
            updateUserData
                ? res.status(200).json({ message: updateUserData, details: true })
                : res
                    .status(404)
                    .json({ messageError: "error internal", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
    async createEmployee(req, res) {
        try {
            const { user, username, lastnames, role, password } = req.body;
            const dataUser = {
                user: user,
                username: username,
                lastnames: lastnames,
                role: role,
                password: await (0, bcrypt_config_1.encryptPasswordSecurity)(password),
            };
            // todo: verify data
            const isExists = await employees_model_1.default.findOne({
                user: dataUser.user,
                password: dataUser.password,
            });
            if (isExists) {
                return res.json({ message: "el usuario ya éxiste", details: dataUser });
            }
            const createUser = await employees_model_1.default.create(dataUser);
            createUser
                ? res.status(200).json({ message: "creado éxitosamente" })
                : res.status(500).json({ message: "no se logró guardar usuario" });
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteEmployee(req, res) {
        try {
            const { id } = req.params;
            const deleteEmployee = await employees_model_1.default.findByIdAndDelete(id);
            deleteEmployee
                ? res.status(200).json({
                    message: "deleted successfully!",
                    details: deleteEmployee,
                    response: true,
                })
                : res
                    .status(404)
                    .json({ messageError: "deleted error", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.employees = employees;
class routesEmployees extends employees {
    async getEmployeeRoute(req, res) {
        try {
            res.send("hello world");
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.routesEmployees = routesEmployees;
