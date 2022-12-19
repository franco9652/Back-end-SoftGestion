/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Empresa = require('../models/EmpresaModel');
const User = require('../models/UserModel');

const empresaController = {
  crearEmpresa: async (req, res) => {
    const { nombre, constructora, habilitado, direccion, facturacion, owner } =
      req.body;
    const { usersId } = req.params;
    try {
      // TODO ver que no exista la empresa
      const adminUser = await User.findOne({ _id: owner });
      usersId.forEach(async (u) => {
        const user = await User.findOne({ _id: u });
        if (!user) {
          return res.status(400).json({
            response: 'usuario no encontrado',
            success: false,
          });
        }
      });
      // TODO luego con middleware
      // if (owner !== userId) {
      //   return res.status(405).json({
      //     response: 'Solo puede crear la empresa un usuario que luego será owner',
      //     success: false,
      //   });
      // }
      if (adminUser) {
        const nuevaEmpresa = await new Empresa({
          nombre,
          constructora,
          habilitado,
          direccion,
          facturacion,
          owner,
          usersId,
        }).populate('usersId');
        nuevaEmpresa.save();
      }
    } catch (error) {
      res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  obtenerEmpresa: async (req, res) => {
    // ! obtener empresa de un duenio
    const { id } = req.params;
    const empresa = await Empresa.findOne({ _id: id });
    if (!empresa) {
      return res.status(404).json({ msg: 'Empresa no encontrada' });
    }
    if (empresa.owner._id.toString() !== req.empresa._id.toString()) {
      return res.json({ msg: 'Acción no válida' });
    }
    res.json(empresa);
  },
  obtenerEmpresasLogisticas: async (req, res) => {
    // TODO
    // const empresas = await Empresa.filter().where(isLogistica);
  },
  obtenerEmpresasConstructoras: async (req, res) => {}, // TODO
  modificarEmpresa: async (req, res) => {
    const { _id } = req.params;
    try {
      Empresa.findOneAndUpdate({ _id }, req.body, { new: true })
        .then((data) =>
          res.status(200).json({
            response: 'Empresa actualizada',
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
  eliminarEmpresa: async (req, res) => {
    const { _id } = req.params;
    const empresa = await Empresa.findOne(_id);
    if (!empresa) {
      return res.status(404).json({ msg: 'Empresa no encontrada' });
    }
    // TODO desp con el middleware de Auth
    // if (empresa._id.toString() !== _id.toString()) {
    //   return res.json({ msg: 'Acción no válida' });
    // }
    try {
      await empresa.deleteOne();
      res.json({ msg: 'Empresa eliminada' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = empresaController;
