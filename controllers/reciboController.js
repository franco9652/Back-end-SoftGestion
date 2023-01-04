const PDFDocument = require('pdfkit');
const fs = require('fs');

const Recibo = require('../models/ReciboModel');
const User = require('../models/UserModel');

// me va a llegar un req.file y no un req.body.. el post me va a llegar algo asi: "https://cloudinary.com.ar/carpeta1/lejajo0034"
//seleccionas el usuario, checkbox (frontend) seleccionas los datos q queres q esten en el recibo

const reciboController = {
  createRecibo: async (req, res) => {
    const { userId } = req.params;
    const { file } = req.file;
    try {
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        succes: false,
      });
    }
  },
  getRecibo: async (req, res) => {},
  deleteRecibo: async (req, res) => {},
};

module.exports = reciboController;
