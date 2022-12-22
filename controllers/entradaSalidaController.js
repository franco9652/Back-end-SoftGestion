/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const EntradaSalida = require('../models/EntradaSalidaModel');
const User = require('../models/UserModel');

const entradaController = {
  marcarIngresoEgreso: async (req, res) => {
    const { fechaHora, latitud, longitud, tipo } = req.body;
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          response: 'usuario no encontrado',
          success: false,
        });
      }
      const nuevaEntradaSalida = await new EntradaSalida({
        tipo,
        fechaHora,
        latitud,
        longitud,
        user,
      }).populate('user');
      nuevaEntradaSalida.save();
      user.entradaSalida.push(nuevaEntradaSalida._id);
      user.save();
      return res.status(201).json({
        response: nuevaEntradaSalida,
        succes: true,
      });
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  eliminarEntradaSalida: async (req, res) => {
    const { userId, entradaId } = req.params;
    try {
      const entrada = await EntradaSalida.findOne({ _id: entradaId });
      await EntradaSalida.findOneAndDelete({ _id: entradaId });
      if (entrada) {
        // Eliminar el id del user que marca entrada
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { entradaSalida: entradaId } }
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
