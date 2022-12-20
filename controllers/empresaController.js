/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const e = require('express');
const Empresa = require('../models/EmpresaModel');
const User = require('../models/UserModel');

const empresaController = {
  crearEmpresa: async (req, res) => {
    const {
      nombre,
      isLogistica,
      isConstructora,
      habilitado,
      direccion,
      facturacion,
      users,
    } = req.body;
    const { myId: owner } = req.params;
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
      const adminUser = await User.findOne({ _id: owner });
      if (!adminUser) {
        return res.status(400).json({
          response: 'usuario admin no encontrado',
          success: false,
        });
      }
      // ! - si algun usuario no esta registrado
      users.forEach(async (u) => {
        const user = await User.findOne({ _id: u });
        if (!user) {
          return res.status(400).json({
            response: 'usuario no encontrado',
            success: false,
          });
        }
      });

      // TODO luego con middleware - autenticacion

      // * creo empresa
      const nuevaEmpresa = await new Empresa({
        nombre,
        isLogistica,
        isConstructora,
        habilitado,
        direccion,
        facturacion,
        users,
        owner,
      }).populate(['users', 'owner']);
      nuevaEmpresa.save();
      return res.status(201).json({
        response: nuevaEmpresa,
        succes: true,
      });
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
    const { myId, empresaId } = req.params;
    try {
      // ! - si la empresa con empresaId no existe
      const empresa = await Empresa.findById(empresaId);
      if (!empresa) {
        return res.status(404).json({ msg: 'Empresa no encontrada' });
      }
      // ! - si el usuario actual no es el owner
      if (empresa.owner._id.toString() !== myId.toString()) {
        return res
          .status(401)
          .json({ msg: 'Usuario no autorizado, no eres owner' });
      }
      // * actualizo empresa
      empresa.nombre = req.body.nombre || empresa.nombre;
      empresa.isLogistica = req.body.isLogistica || empresa.isLogistica;
      empresa.isConstructora =
        req.body.isConstructora || empresa.isConstructora;
      empresa.habilitado = req.body.habilitado || empresa.habilitado;
      empresa.direccion = req.body.direccion || empresa.direccion;
      empresa.facturacion = req.body.facturacion || empresa.facturacion;
      empresa.owner = req.body.owner || empresa.owner;
      empresa.users = req.body.users || empresa.users;
      await empresa.save();
      return res.status(200).json({
        msg: 'Empresa actualizada con exito',
        succes: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  eliminarEmpresa: async (req, res) => {
    const { myId, empresaId } = req.params;
    try {
      // ! - si la empresa con empresaId no existe
      const empresa = await Empresa.findById(empresaId);
      if (!empresa) {
        return res.status(404).json({ msg: 'Empresa no encontrada' });
      }
      // ! - si el usuario actual no es el owner
      if (empresa.owner._id.toString() !== myId.toString()) {
        return res
          .status(401)
          .json({ msg: 'Usuario no autorizado, no eres owner' });
      }

      // TODO desp con el middleware de Auth

      // * elimino empresa
      await empresa.deleteOne();
      res.json({ msg: 'Empresa eliminada' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = empresaController;
