const User = require("../models/user");
const Rol = require("../models/rol");
//const bcrypt = require("bcryptjs");

module.exports = {


    register(req, res) {
        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error con el registro del usuario",
              error: err,
            });
          }
    
          return res.status(201).json({
            success: true,
            message: "El registro se realizo correctamente",
            data: data, // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
          });
        });
    },
    
    //REGISTRO CON IMAGEN
    async registerWithImage(req, res) {
    
        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    
        const files = req.files;
    
        if (files.length > 0) {
          const path = `image_${Date.now()}`;
          const url = await storage(files[0], path);
    
          if (url != undefined && url != null) {
            user.image = url;
          }
        }
    
        User.create(user, (err, data) => {  // EN ESTA PARTE EL USUARIO SE REGISTRA
    
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error con el registro del usuario",
              error: err,
            });
          }
    
          user.id = String(data);
          const token = jwt.sign(
            { id: user.id, email: user.email },
            keys.secretOrKey,
            {}
          );
          user.session_token = `JWT ${token}`;
    
          //ASIGNAMOS EL ROL 
          Rol.create(user.id, 3, (err, data) => {
    
            if (err) {
              return res.status(501).json({
                success: false,
                message: "Hubo un error con el registro del rol de usuario",
                error: err,
              });
            }
            
            return res.status(201).json({
              success: true,
              message: "El registro se realizo correctamente",
              data: user,
            });
    
    
          });
    
         
        });
      },


}