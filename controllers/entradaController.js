/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Entrada = require('../models/EntradaModel');
const User = require('../models/UserModel');

const entradaController = {
  crearEntrada: async (req, res) => {
    const { fechaHora, latitud, longitud } = req.body;
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          response: 'usuario no encontrado',
          success: false,
        });
      }
      const nuevaEntrada = await new Entrada({
        fechaHora,
        latitud,
        longitud,
        user,
      }).populate('user');
      nuevaEntrada.save();
      user.save();
      return res.status(201).json({
        response: nuevaEntrada,
        succes: true,
      });
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  eliminarEntrada: async (req, res) => {
    const { _id } = req.params;
    try {
      const entrada = await Entrada.findOne({ _id });
      await Entrada.findOneAndDelete({ _id });
      if (entrada) {
        // Eliminar el id del user que marca entrada
        await User.findOneAndUpdate(
          { _id }, // ? ta ok?
          { $pull: { infoSalida: _id } }
        );
        return res.status(200).json({
          response: 'Entrada eliminada de manera exitosa',
          success: true,
        });
      }
    } catch (error) {
      res.status(404).json({
        response: error.message,
      });
    }
  },
};

module.exports = entradaController;
