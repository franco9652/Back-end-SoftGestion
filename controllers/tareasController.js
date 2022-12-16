/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/UserModel');
const Tarea = require('../models/TareasModel');

const tareaControler = {
  crearTarea: async (req, res) => {
    const { fechaHora, obra, tarea } = req.body;
    const { myId, userId } = req.params;
    try {
      const adminUser = await User.findOne({ _id: myId });
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          response: 'usuario no encontrado',
          success: false,
        });
      }
      if (adminUser && user) {
        const nuevaTarea = await new Tarea({
          fechaHora,
          obra,
          tarea,
          nombre: adminUser._id,
          userId: user._id,
        }).populate(['nombre', 'userId']);
        nuevaTarea.save();
        adminUser.asignacionTareas.push(nuevaTarea._id);
        user.asignacionTareas.push(nuevaTarea._id);
        adminUser.save();
        user.save();
        return res.status(201).json({
          response: nuevaTarea,
          succes: true,
        });
      }
      return res.status(400).json({
        response: 'usuario admin no encontrado',
        success: false,
      });
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },

  eliminarTarea: async (req, res) => {
    const { taskId } = req.params;
    try {
      const tarea = await Tarea.findOne({ _id: taskId });
      await Tarea.findOneAndDelete({ _id: taskId });
      if (tarea) {
        // Eliminar el id de la tarea de la persona que la creo.
        await User.findOneAndUpdate(
          { _id: tarea.nombre },
          { $pull: { asignacionTareas: taskId } }
        );
        // Eliminar la tarea del listado de la persona a la que se le asigno
        await User.findOneAndUpdate(
          { _id: tarea.userId },
          { $pull: { asignacionTareas: taskId } }
        );
        return res.status(200).json({
          response: 'Tarea eliminada de manera exitosa',
          success: true,
        });
      }
      res.json({ status: 'asd' });
    } catch (error) {
      res.status(404).json({
        response: error.message, // permiso Herni, creo va esta linea
      });
    }
  },

  modificarTarea: async (req, res) => {
    const { taskId } = req.params;
    try {
      await Tarea.findOneAndUpdate({ _id: taskId }, req.body, { new: true })
        .then((data) =>
          res.status(200).json({
            response: 'Tarea Actualizada',
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
    } catch (err) {
      res.status(400).json({
        response: err.message,
        success: false,
      });
    }
  },
};

module.exports = tareaControler;
