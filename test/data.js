const fs = require("fs");
const path = require("path");

// Fucniòn para identificar si existe la ruta
const existPath = (file) => {
   return fs.existsSync(file);

};
// Funciòn que identifica si la ruta es relativa o absoluta, y en caso de ser relativa, la vuelve absoluta.
const absolute = (file) =>{
  if (!path.isAbsolute(file)) {
    file = path.resolve(file)}
    return file
}
// Funciòn que identiifca si es un archivo 
const isFile = (file) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      reject(err);
    } else {
      
    } if (stats.isFile()) {
      return file;
          
    } 
    
  });
}

// funciòn para leer los archivos, debe ser una promesa
const readFile = (file) => {
  
}



const mdExtension = (file) => {
  
}

//
/*
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
*/
module.exports = {
  //identificator, 
  existPath, absolute, isFile,
};
module.exports.fs = require("fs");
module.exports.path = require("path");



