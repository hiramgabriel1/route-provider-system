import { Sequelize } from "sequelize";


const db= new Sequelize({
    database: 'nombre_de_tu_base_de_datos',
    username: 'tu_usuario',
    password: 'tu_contraseña',
    host: 'localhost', 
    dialect: 'mysql',
})

export default db;