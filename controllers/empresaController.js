/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Empresa = require('../models/EmpresaModel');
const User = require('../models/UserModel');

const empresaController = {
  crearEmpresa: async (req, res) => {
    const { nombre, tipoEmpresa, habilitado, direccion, facturacion } =
      req.body;
    const { ownerId } = req.params;
    try {
      // ! - si ya existe una empresa registrada el nombre solicitado
      const existeEmpresa = await Empresa.findOne({ nombre });
      if (existeEmpresa) {
        return res.status(406).json({
          response: `${nombre}, no es aceptado como nombre de empresa. Ya está registrado`,
          success: false,
        });
      }
      // ! - si no hay un usuario registrado con el nombre = owner
      const adminUser = await User.findOne({ _id: ownerId });
      if (!adminUser) {
        return res.status(400).json({
          response: 'usuario admin no encontrado',
          success: false,
        });
      }

      // * creo empresa
      const nuevaEmpresa = await new Empresa({
        nombre,
        tipoEmpresa,
        habilitado,
        direccion,
        facturacion,
        owner: ownerId,
      });
      nuevaEmpresa.save((err, result) => {
        if (err) {
          return res.status(404).json({
            response: err.message,
            success: false,
          });
        }
        return res.status(202).json({
          response: result,
          success: true,
        });
      });
    } catch (error) {
      res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  obtenerUnaEmpresa: async (req, res) => {
    // ! obtener empresa de un duenio
    const { empresaId } = req.params;
    const empresa = await Empresa.findOne({ _id: empresaId });
    if (!empresa) {
      return res.status(404).json({ msg: 'Empresa no encontrada' });
    }
    return res.status(200).json({
      response: empresa,
      success: true,
    });
  },
  obtenerEmpresas: async (req, res) => {
    const { tipoDeEmpresa } = req.query;
    try {
      let empresa = await Empresa.find();
      if (!req.query || tipoDeEmpresa === null || tipoDeEmpresa === undefined) {
        if (empresa.length > 0) {
          return res.status(200).json({
            response: empresa,
            success: true,
          });
        }
        return res.status(200).json({
          response: 'La lista de empresas esta vacia',
          success: false,
        });
      }
      empresa = await Empresa.find({ tipoEmpresa: tipoDeEmpresa });
      if (empresa.length > 0) {
        return res.status(200).json({
          response: empresa,
          succes: true,
        });
      }
      return res.status(404).json({
        response: `no hay empresas del tipo ${tipoDeEmpresa}`,
        succes: false,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
  modificarEmpresa: async (req, res) => {
    const { empresaId } = req.params;
    try {
      const empresa = await Empresa.findOneAndUpdate(
        { _id: empresaId },
        req.body,
        { new: true }
      );
      if (!empresa) {
        return res.status(404).json({
          response: 'Empresa no encontrada',
          succes: false,
        });
      }
      return res.status(200).json({
        response: empresa,
        succes: false,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        succes: false,
      });
    }
  },
  eliminarEmpresa: async (req, res) => {
    const { empresaId } = req.params;
    try {
      // ! - si la empresa con empresaId no existe
      const empresa = await Empresa.findOneAndDelete({ _id: empresaId });
      if (!empresa) {
        return res.status(400).json({
          response: 'Empresa no encontrada',
          succes: false,
        });
      }
      return res.status(200).json({
        response: 'Empresa eliminada',
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        succes: false,
      });
    }
  },
};

module.exports = empresaController;
