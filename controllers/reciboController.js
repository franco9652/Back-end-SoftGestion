const Recibo = require('../models/ReciboModel');
const User = require('../models/UserModel');

const reciboController = {
  // TODO: testear con un caso real
  createRecibo: async (req, res) => {
    const { userId } = req.params;
    const { recibo } = req.files;
    try {
      const user = await User.findById({ _id: userId });
      if (!user) {
        return res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      if (!recibo) {
        return res.status(404).json({
          response: 'Recibo no cargado',
          success: false,
        });
      }
      // TODO: almacenar recibo en la db, como obtengo la url?
      const nuevoRecibo = await new Recibo({
        fecha: Date.now(),
      });
      nuevoRecibo.save();
      res.send('Recibo almacenado');
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  getRecibo: async (req, res) => {
    const { reciboId } = req.params;
    const recibo = await Recibo.findById({ _id: reciboId });
    try {
      if (!recibo) {
        return res.status(404).json({
          response: 'Recibo no encontrado',
          success: false,
        });
      }
      return res.status(200).json({
        response: recibo,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  // TODO: testear
  /*
   * funcion que retorna los recibos creados en el MM/YYYY pasados como query params.
   * si mes o anio son vacios/undefined, retorno todos los recibos del sistema
   */
  getRecibos: async (req, res) => {
    const { anio, mes } = req.query;
    try {
      let recibos;
      if (
        !req.query ||
        anio === null ||
        anio === undefined ||
        mes === null ||
        mes === undefined
      ) {
        recibos = await Recibo.find();
        if (recibos.length > 0) {
          return res.status(200).json({
            response: recibos,
            success: true,
          });
        }
        return res.status(200).json({
          response: 'La lista de recibos esta vacia',
          success: true,
        });
      }
      // FIXME: query para buscar en un mes y anio
      recibos = await Recibo.find({
        created_on: {
          $gte: new Date(anio, mes),
          $lt: new Date(anio, mes),
        },
      });
      if (recibos.length > 0) {
        return res.status(200).json({
          response: recibos,
          success: true,
        });
      }
      return res.status(200).json({
        response: `No hay recibos en la fecha ${mes}/${anio}`,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  deleteRecibo: async (req, res) => {
    const { reciboId } = req.params;
    try {
      const recibo = await Recibo.findOneAndDelete({ _id: reciboId });
      if (!recibo) {
        return res.status(404).json({
          response: 'Recibo no encontrado',
          success: false,
        });
      }
      return res.status(200).json({
        response: 'Recibo eliminado',
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
};

module.exports = reciboController;
