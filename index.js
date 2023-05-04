// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const  access  = require('fs');
//esto es para poder usar  los modulos de path
const fs = require('fs');
const path = require('path');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {
//1) para verificar si la ruta existe (forma sincrònica)
if (fs.existsSync(routes)) {
  //2) si la ruta no es absoluta, se vuelve absoluta con path.resolve
  if (!path.isAbsolute(routes)) {
    routes = path.resolve(routes);
    //resolve('ruta absoluta');
    console.log(routes, 'routesss');
  }// aquì identifico si es un archivo o e sun directorio
  fs.stat(routes, (err, stats) => {
    if(err){
      reject (err);
    } else {

    } if(!stats.isFile()) {
      console.log('es un directorio');
      //se utiliza esto fs.readdirSync() method 
      //leerlo como directorio y me va entregra un array con las rutas de los archivos
      filenames = fs.readdirSync(__dirname);
      filenames.forEach(file => {
        console.log(file , 'esta es la fila del directorio');
        fs.readFile(file, (err, data) => {
          if (err) {
          reject (err);
        } else {
          console.log(data, 'se lee los archivos de las carpetas');
        }
          
      }); 
        
    });   
    } else {
      // es un archivo
      // leerlo como archivo de manera asincrònica y me devuelve un buff o algo asì
      console.log('es un archivo');
      fs.readFile(routes, (err, data) => {
        if (err) {
        reject (err);
      } else {
        console.log(data, 'se lee el archivo');
      }
        
      }); 
    }


  });
  //3) identficar si es un archivo, si lo es leer de maneraa asincronica, p
  // pero si es un directorio, leer directorio de manera sincrònica
  
} else {
  reject('la ruta no existe');
}
     //la ruta es absoluta? 


  });
}


module.exports = {
  mdLinks
};
/* 


    
    if (fs.access(routes, constants.F_OK, (err) => {
      resolve(resultado);
    }));
    */
   /*
    const mdLinks = (routes, options) => {
      return new Promise((resolve, reject) => {
        // Verificar si la ruta existe
        if (fs.existsSync(routes)) {
          // Si la ruta no es absoluta, se vuelve absoluta con path.resolve
          if (!isAbsolute(routes)) {
            routes = path.resolve(routes);
          }
    
          // Verificar si la ruta es un archivo o un directorio
          fs.stat(routes, (err, stats) => {
            if (err) {
              reject(err);
            } else {
              if (stats.isFile()) {
                console.log(`${routes} es un archivo`);
              } else if (stats.isDirectory()) {
                console.log(`${routes} es un directorio`);
              } else {
                reject(`${routes} no es un archivo ni un directorio`);
              }
            }
          });
        } else {
          reject('La ruta no existe');
        }
      });
    };
    */
/*
 fs.stat(routes, (err, stats) => {
    if (err) {
      reject(err);
    } else {

    }if (stats.isFile()){
      console.log('es un archivo');

    }else if (stats.isDirectory()){
      console.log('es un direcotrio');
    }
  
   
});
   
*/

module.exports = mdLinks;
