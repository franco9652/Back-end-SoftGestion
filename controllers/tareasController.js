/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/UserModel');
const Tarea = require('../models/TareasModel');

const tareaControler = {
  crearTarea: async (req, res) => {
    const { myId } = req.params;
    const { fechaHora, obra, tarea } = req.body;
    try {
      const adminUser = await User.findOne({ _id: myId });
      if (adminUser) {
        const nuevaTarea = await new Tarea({
          fechaHora,
          obra,
          tarea,
          nombre: adminUser._id,
        });
        return nuevaTarea.save(async (err, doc) => {
          if (err) {
            return res.status(400).json({
              response: err.message,
              success: false,
            });
          }
          await User.findOneAndUpdate(
            { _id: myId },
            { $push: { asignacionTareas: nuevaTarea._id } }
          );
          return res.status(201).json({
            response: 'La tarea se creo de manera exitosa',
            tarea: doc,
            succes: true,
          });
        });
      }
      return res.status(404).json({
        response: 'usuario admin no encontrado',
        success: false,
      });
    } catch (err) {
      return res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  asignarTarea: async (req, res) => {
    const { taskId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        response: 'el campo de usuario debe estar completo',
        success: false,
      });
    }
    try {
      const task = await Tarea.findOne({ _id: taskId });
      const user = await User.findOne({ _id: userId });
      if (!task) {
        return res.status(404).json({
          response: 'Tarea no encontrada',
          success: false,
        });
      }
      if (!user) {
        return res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { asignacionTareas: task._id } }
      );
      return res.status(200).json({
        response: `la tarea '${task.tarea}' fue asignada correctamenta a '${user.name}'`,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        succes: false,
      });
    }
  },

  eliminarTarea: async (req, res) => {
    const { taskId } = req.params;
    try {
      const task = await Tarea.findOneAndDelete({ _id: taskId });
      if (task) {
        // Eliminar la tarea de todos los usuarios que la contengan
        await User.updateMany(
          { asignacionTareas: { $in: taskId } },
          { $pull: { asignacionTareas: taskId } }
        );
        return res.status(200).json({
          response: 'Tarea eliminada de manera exitosa',
          tareaEliminada: task,
          success: true,
        });
      }
      return res.status(404).json({
        response: 'Tarea no encontrada',
        success: false,
      });
    } catch (error) {
      res.status(404).json({
        response: error.message,
        success: false,
      });
    }
  },

  quitarTarea: async (req, res) => {
    const { taskId, userId } = req.body;
    try {
      await Tarea.findOneAndDelete({ _id: taskId }, async (err) => {
        if (err) {
          return res.status(400).json({
            result: err.message,
            success: false,
          });
        }
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { asignacionTareas: taskId } }
        );
        return res.status(200).json({
          response: 'tarea quitada!',
          success: true,
        });
      });
    } catch (error) {
      return res.status(404).json({
        response: error.message,
        success: false,
      });
    }
  },

  modificarTarea: async (req, res) => {
    const { taskId } = req.params;
    try {
      return await Tarea.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
      })
        .then((data) =>
          res.status(200).json({
            response: 'Tarea Actualizada',
            data,
            success: true,
          })
        )
        .catch((err) =>
          res.status(404).json({
            response: err.message,
            success: false,
          })
        );
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
  obtenerTareas: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId }).populate(
        'asignacionTareas'
      );
      if (!user) {
        return res.status(404).json({
          response: 'Usuario no encontrado',
          success: false,
        });
      }
      return res.status(200).json({
        response: user.asignacionTareas,
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
};

module.exports = tareaControler;
