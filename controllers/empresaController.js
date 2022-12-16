/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Empresa = require('../models/EmpresaModel');
const User = require('../models/UserModel');

const empresaController = {
  crearEmpresa: async (req, res) => {
    const { nombre, constructora, habilitado, direccion, facturacion, owner } =
      req.body;
    const { userId } = req.params;
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
      const error = new Error('Empresa ya registrada');
      return res.status(400).json({ msg: error.message });
    }
    if (owner !== userId) {
      return res.status(405).json({
        response: 'Solo puede crear la empresa un usuario que luego será owner',
        success: false,
      });
    }
    const existeUser = await User.findOne({ _id: userId });
    if (!existeUser) {
      return res.status(400).json({
        response: 'usuario no encontrado',
        success: false,
      });
    }
    try {
      const user = await User.findOne({ _id: userId });
    } catch (error) {}
  },
  // obtenerEmpresa: async (req, res) => {},
  // obtenerEmpresas: async (req, res) => {},
  // modificarEmpresa: async (req, res) => {},
  // eliminarEmpresa: async (req, res) => {},
};

module.exports = empresaController;
