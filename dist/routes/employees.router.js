"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controller_1 = require("../controllers/employees.controller");
const employeesController = new employees_controller_1.employees();
const routerEmployees = (0, express_1.Router)();
const path = "/api/v1";
// todo: render all employees
routerEmployees.get(`${path}/employees`, (req, res) => {
    employeesController.getEmployees(req, res);
});
// todo: render employee by id
routerEmployees.get(`${path}/employee/:employeeId`, (req, res) => {
    employeesController.getEmployeeById(req, res);
});
// todo: create a new employee
routerEmployees.post(`${path}/employee/new`, (req, res) => {
    employeesController.createEmployee(req, res);
});
// todo: edit a employee PENDIENTE POR HACER
routerEmployees.patch(`${path}/employee/edit/:id`, (req, res) => {
    employeesController.editEmployee(req, res);
});
// todo: delete a employee
routerEmployees.delete(`${path}/employee/delete/:id`, (req, res) => {
    employeesController.deleteEmployee(req, res);
});
exports.default = routerEmployees;
