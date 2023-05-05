const fs = require("fs");
const path = require("path");

//hacer una funciòn para leer direcotrios
const identificator = (routes) => {
  //para identificar si es un directorio
  fs.stat(routes, (err, stats) => {
    if (err) {
      reject(err); // TODO: reject no existe en este contexto
    } else {
      if (!stats.isFile()) {
        do {
          const filenames = fs.readdirSync(__dirname);
          filenames.forEach((files) => {
            console.log(files, "esta es el archivo del directorio");
          });
        } while (false);
        {
          //se utiliza esto fs.readdirSync() method
          //leerlo como directorio y me va entregra un array con las rutas de los archivos
        }
      } else {
        console.log("es un archivo");
      }
    }
  });
};
module.exports = {
  identificator,
};
module.exports.fs = require("fs");
module.exports.path = require("path");
