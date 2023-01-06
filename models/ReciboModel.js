const mongoose = require('mongoose');

const reciboSchema = mongoose.Schema(
  {
    recibosSueldo: [
      {
        type: [{ type: String }],
        required: false,
        default: [],
      },
    ],
    fecha: {
      type: Date,
      default: new Date().now,
    },
  },
  {
    timestamps: true,
  }
);

const Recibo = mongoose.model('Recibo', reciboSchema);

module.exports = Recibo;
