/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const InfoSalida = require('../models/InfoSalidaModel');
const User = require('../models/UserModel');

const infoSalidaController = {
  crearInfoSalida: async (req, res) => {
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
      const nuevaInfoSalida = await new InfoSalida({
        fechaHora,
        latitud,
        longitud,
        user,
      }).populate('user');
      nuevaInfoSalida.save();
      user.infoSalida.push(nuevaInfoSalida._id);
      user.save();
      return res.status(201).json({
        response: nuevaInfoSalida,
        succes: true,
      });
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  eliminarInfoSalida: async (req, res) => {
    const { userId, infoSalidaId } = req.params;
    try {
      const infoSalida = await InfoSalida.findOne({ _id: infoSalidaId });
      await InfoSalida.findOneAndDelete({ _id: infoSalida });
      if (infoSalida) {
        // Eliminar el id del user que marca salida
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { infoSalida: infoSalidaId } }
        );
        return res.status(200).json({
          response: 'Informacion de salida eliminada de manera exitosa',
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

module.exports = infoSalidaController;
