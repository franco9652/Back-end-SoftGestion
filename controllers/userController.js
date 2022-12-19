/* eslint-disable consistent-return */
const User = require('../models/UserModel');

const userController = {
  createUser: async (req, res) => {
    const { name, lastName, image, dni, role } = req.body;
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
        name,
        lastName,
        image,
        dni,
        role,
      });
      user.save();
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

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const { id } = req.params;
    try {
      User.findOneAndDelete({ _id: id }, (err, data) => {
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
    const { id } = req.params;
    try {
      User.findOneAndUpdate({ _id: id }, req.body, { new: true })
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
};

module.exports = userController;
