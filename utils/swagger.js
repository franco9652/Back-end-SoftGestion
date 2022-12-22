// const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// metadataInfo about API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'SoftGestion API', version: '1.0.0' },
  },
  apis: [
    'routes/index.js',
    'routes/empresa.js',
    'routes/entradaSalida.js',
    'routes/tareas.js',
    'routes/user.js',
    'models/EmpresaModel.js',
    'models/EntradaSalidaModel.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `version 1 de la documentacion esta disponible en http://localhost:${port}/api-docs`
  );
};

module.exports = { swaggerDocs };
