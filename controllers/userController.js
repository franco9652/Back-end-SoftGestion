/* eslint-disable no-underscore-dangle */
const User = require('../models/UserModel');

const agregarUser = async (req, res) => {
  const user = new User(req.body);
  user.entradas = req.entradas._id; // ? aca no le encontre la vuelta cuando tengo arrays
  user.infoSalida = req.infoSalida._id; // ? ^
  user.asignacionTareas = req.asignacionTareas._id; // ? ^
  try {
    const userAlmacenado = await user.save();
    return res.json(userAlmacenado);
  } catch (error) {
    return res.status(400).json({
      response: error.response,
      success: false,
    });
  }
};

const obtenerUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  return res.json(user);
};

const obtenerUsers = async (req, res) => {
  if (req.role && req.asignacionTareas) {
    // ? no pude con esto, les parece que tendria utilidad? obtener usuarios por rol y tarea
    // const users = await User.find()
    // .where("role")
    // .equals(req.role);
    // .where("asignacionTareas")
    // .equals(req.asignacionTareas);
    // return res.json(users);
  }
  if (req.role) {
    // ? obtener usuarios por rol
    const users = await User.find().where('role').equals(req.role);
    return res.json(users);
  }
  if (req.asignacionTareas) {
    // ? obtener usuarios por tareas
    const users = await User.find()
      .where('asignacionTareas')
      .equals(req.asignacionTareas);
    return res.json(users);
  }
};

const actualizarUser = async (req, res) => {}; // TODO

const eliminarUser = async (req, res) => {}; // TODO

export {
  agregarUser, obtenerUser, obtenerUsers, actualizarUser, eliminarUser,
};
