import Usuario from "../models/login.model";
import { verifyPasswordSecurity, encryptPasswordSecurity } from "../validators/bcrypt.config";

export class LoginSystem {

    async loginUser(username: string, password: string) {
        try {
            const usuario= await Usuario.findOne({
                where: { nombre: username },
            });

            if (!usuario) {
                console.log("Usuario no encontrado");
            } else {
                const passwordValid = "s"//await verifyPasswordSecurity(password, usuario.password);
                
                if(passwordValid) {
                    console.log("Inicio de sesión exitoso");
                } else {
                    console.log("Contraseña incorrecta");
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    async registerUser(username: string, password: string) {
        try{
            const usuario= await Usuario.findOne({
                where: { nombre: username },
            });         
               if(usuario){
                 console.log("ya existe el usuario")
               }else{
                    const passwordHash= await encryptPasswordSecurity(password)
                    await Usuario.create({
                        nombre:username,
                        password:passwordHash,
                        rol:false,
                        
                    })

               }
        }catch(error){
            console.log(error)
        }

    }
}
