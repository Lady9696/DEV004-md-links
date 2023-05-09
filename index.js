// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const  access  = require('fs');
//esto es para poder usar  los modulos de path
const { identificator } = require('./test/data');
const { fs, path } = require('./test/data.js');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {

    //encadena
    existPath(routes)
    .then(
      (existe) => {
        if(existe){
           return esAsboluta()
        }
        else{
          reject()
        }
      }
    )
    .then(
      (absouta) => {
          if(!abolsuta){
              convertirAbsoluita()
          }
      }
    )

    //anidad
    
    

    //1) para verificar si la ruta existe (forma sincrònica)
    if (fs.existsSync(routes)) {
      //2) si la ruta no es absoluta, se vuelve absoluta con path.resolve
      if (!path.isAbsolute(routes)) {
        routes = path.resolve(routes);
        //resolve('ruta absoluta');
        console.log(routes, 'routesss');
      } 
      identificator(routes)
      let archivoMd;
      fs.stat(routes, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          let 
        } if (!stats.isFile()) {
          console.log('es un directorio');
          //se utiliza esto fs.readdirSync() method 
          //leerlo como directorio y me va entregra un array con las rutas de los archivos
            filenames = fs.readdirSync(__dirname);
            filenames.forEach(files => {
              console.log(files, 'esta es el archivo del directorio');
              //asigno una variable a la funciòn
              archivoMd = identificator();
              //const resultFile = files.filter(file => file.includes('.md'));

              //Sconsole.log(result);
            });
        } else {
          // es un archivo
          // leerlo como archivo de manera asincrònica y me devuelve un buff o algo asì
          console.log('es un archivo');
          //
          //es un archivo md(?
          //auì debo extraer las extensiones de los archivos
          //archivoMd = routes

        }
        //le ctura de los archivos md


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



