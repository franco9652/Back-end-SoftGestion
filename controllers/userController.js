/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
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
      user.oldPasswords.push(user.password);
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
  login: async (req, res) => {
    const { dni, password } = req.body;
    try {
      const user = await User.findOne({ dni });
      if (!user) {
        return res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      if (user.verifyPass(password)) {
        return res.status(200).json({
          response: user,
          success: true,
        });
      }
    } catch (err) {
      return res.status(400).json({
        responsec: err.message,
        success: false,
      });
    }
  },
  updatePassword: async (req, res) => {
    const { password } = req.body;
    const { userId } = req.params;
    try {
      const passHashed = await bcrypt.hashSync(password, 10);
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      if (user.checkOldPass(password)) {
        return res.status(400).json({
          response: 'Ingresa una contraseña que no hayas utilizado',
          success: false,
        });
      }
      user.oldPasswords.push(passHashed);
      user.password = passHashed;
      user.save();
      return res.status(200).json({
        response: 'Contraseña actualizada con exito',
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  generarReciboSueldo: async (req, res) => {},
};

module.exports = userController;
