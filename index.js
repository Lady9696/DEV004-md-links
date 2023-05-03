//1) fs se debe usar para poder leer la ruta del archivo
const fs = require('fs');
const mdLinks = (path, options) =>{
  return  new Promise((resolve, reject) => {
    //2) para verificar si la ruta existe (forma sincrònica)
    if(fs.existsSync(path)){

      resolve('la ruta existe');

    } else {
      reject('la ruta no existe');

    }


    
  });

  
}


module.exports = {
  mdLinks
};
