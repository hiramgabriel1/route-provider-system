// login.model.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/[mysql]connection";

const Usuario = db.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.BOOLEAN
    }
});

export default Usuario;
