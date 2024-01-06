"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class homeController {
    // constructor(parameters) {
    // }
    async getDataParams(req, res) {
        try {
            res.json({ username: "Victor Jímenez" });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = homeController;
