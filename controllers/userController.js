/* eslint-disable consistent-return */
const User = require('../models/UserModel');

const userController = {
  createUser: async (req, res) => {
    const { name, lastName, image, dni, role, salary, password } = req.body;
    try {
      let user = await User.findOne({ dni });
      if (user) {
        return res.status(400).json({
          response: 'Este usuario ya existe',
          success: false,
        });
      }
      user = await new User({
        name,
        lastName,
        image,
        dni,
        role,
        salary,
        password,
      });
      user.save();
      user.oldPasswords.push(user.password); // FIXME: no la guarda hasheada
      return res.status(201).json({
        response: user,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.response,
        success: false,
      });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      return res.status(200).json({
        response: user,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findOneAndDelete({ _id: id }, (err, data) => {
        if (err) {
          return res.status(400).json({
            response: err.message,
            success: false,
          });
          // eslint-disable-next-line no-else-return
        } else {
          return res.status(200).json({
            response: 'Usuario eliminado',
            usuarioEliminado: data,
            success: true,
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    // TODO: almacenar pw nueva en el historial si es que se actualiza
    const { id } = req.params;
    try {
      await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .then((data) =>
          res.status(200).json({
            response: 'usuario actualizado',
            data,
            success: true,
          })
        )
        .catch((err) =>
          res.status(400).json({
            response: err.message,
            success: false,
          })
        );
    } catch (error) {
      res.status(400).json({
        respnse: error.message,
        success: false,
      });
    }
  },
  // TODO: login (dejo pseudocode de una web)
  //   loginUser: function(username, password, callback) {
  //     UserModel.findOne({username: username}).exec(function(error, user) {
  //       if (error) {
  //         callback({error: true})
  //       } else if (!user) {
  //         callback({error: true})
  //       } else {
  //         user.comparePassword(password, function(matchError, isMatch) {
  //           if (matchError) {
  //             callback({error: true})
  //           } else if (!isMatch) {
  //             callback({error: true})
  //           } else {
  //             callback({success: true})
  //           }
  //         })
  //       }
  //     })
  //   }
  // }
};

module.exports = userController;
