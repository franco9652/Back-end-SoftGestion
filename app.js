/* eslint-disable no-unused-vars */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const config = require('config');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const BDConnection = require('./utils/BD/dataBase');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger(config.get('logger')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { swaggerDocs: V1SwaggerDocs } = require('./utils/swagger');

app.use('/', indexRouter);
app.use('/api/v1', V1SwaggerDocs);
V1SwaggerDocs(app, process.env.PORT);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// creacion de recibos de sueldo en formato .pdf
// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('./output/sueldos.pdf'));

// Embed a font, set the font size, and render some text
doc
  //.font('./public/stylesheets/style.css/body.font') // TODO: insertar fuente
  .fontSize(25)
  .text('Recibo de sueldo', 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('./public/images/sueldo.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center',
});

// Add another page
doc.addPage().fontSize(25).text('Liquidación de sueldo...', 100, 100);

// comentado xq quizas luego sirve
// // Draw a triangle
// doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Link a la app de SoftGestion!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/'); // TODO: insertar nuestro link

// Finalize PDF file
doc.end();

module.exports = app;
