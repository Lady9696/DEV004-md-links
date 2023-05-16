const fs = require("fs");
const path = require("path");
const axios = require('axios');
const  error  = require("console");

// Fucniòn para identificar si existe la ruta
const existPath = (file) => {
  return fs.existsSync(file);

};
// Funciòn que identifica si la ruta es relativa o absoluta, y en caso de ser relativa, la vuelve absoluta.
const absolute = (file) => {
  if (!path.isAbsolute(file)) {
    file = path.resolve(file)
  }
  return file
}
// Funciòn para identifar archivos md
const identificatorMd = (file) => {
  if (path.extname(file) === '.md') {
    console.log(file, 'es md');
    return true

  } else {
    return false
  }
}
// 
const getStats = (route) => {
  return new Promise ((resolve, reject) => {

    fs.stat(route, (err, stats) => {
      if (err){
       reject(err)
      } else {
        resolve(stats)
      }

  });
})
}
// leer archivos md 
const readMd = (file) => {
  return new Promise ( (resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else 
      resolve(data)
    });
  })
  
}
function processEnsayo(data, route) {
  // aquì saco el patron [texto](links)
  const regexMdLinks = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gm
  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  // aquì le paso el mètodo  para identificar los links que debo extraer
  // me devuelve un array
  const identificator = data.match(regexMdLinks);
  //console.log('esto es todos los links y textos del string', identificator );
  // aquì creo dos arrays vacios  
  let arrObjFalse = [];
  let links = [];
  // Necesito crear dos objetos validate true y validate false
  // para validate false, creo arrObjFalse
  // 
  for (let i = 1; i < identificator.length; i++) {
    // para extraer el texto y los links del array 
    const text = singleMatch.exec(identificator[i]);

    // como esto me trae otra infromaciòn que no necesito, introduzco lo que necesito en el objeto 
    // arrObjFalse, que es  href(el link), text (el texto), y el  absolutePath (ruta absoluta) con el mètodo push
    //console.log('esto es el metodo',text);

    arrObjFalse.push({
      href: text[2],
      text: text[1],
      file: route,

    });
    //esto hace parte del obajeto validate true
    links.push({ href: text[2], cantidad: i });
    //console.log(arrObjFalse, 'esto es cuando validate es false');
  }
  // este return me sirve para poder usar los links que voy a validar en otra funciòn
  return {
    //arrObjFalse: arrObjFalse,
    links: links
  };

}

// aquì estoy verificando si el link esta disponible o kha
function checkLink(url, cantidad) {
  return new Promise((resolve, reject) => {
    // aquì utilizo axios
    return axios.get(url)
      // la promesa
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          resolve(`${url} ${cantidad} si funciona ${response.status}`);
        } else if (response.status >= 100 && response.status <= 199) {
          resolve(`${url} ${cantidad}  respuesta iformativacodigo ${response.status}`);
        } else if (response.status >= 300 && response.status <= 399) {
          resolve(`${url} ${cantidad}  redirecciòn ${response.status}`);
        } else {
          resolve(`${url} ${cantidad}  funcion pero no se cual es el response`);
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 499) {

          reject(`${url} ${cantidad}  no está funcionando ${error.response.status}`);

        } else if (error.response && error.response.status >= 500 && error.response.status <= 599) {
          reject(`${url} ${cantidad} no está funcionando  ${error.response.status}`);
        } else {
          reject(`${url} ${cantidad} error what ${error.response}`);
        }

      });
  })
}
/*
let filesDirectory = [];
//hacer una funciòn para leer direcotrios
const readDirectory = (routes) => {
  
  fs.stat(routes, (err, stats) => {
    if (err) throw err;
    if(stats.isDirectory() === true){
      const filenames = fs.readdirSync(routes);
      //console.log(filenames);
      filenames.forEach((item) => {
        filesDirectory.push(item);

        // console.log(filesDirectory, "esta es el archivo del directorio");
        // readDirectory(item)
      });
      console.log(filesDirectory, 'estee');
    }
    // console.log(`stats: ${JSON.stringify(stats)}`);
   
      
     
      

    
    //console.log(filesDirectory);
  })


}
*/
//funciòn para leer todos los archivos de los directorios
const getAllFilesMd = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFilesMd(dirPath + "/" + file, arrayOfFiles)
    } else {
      const filePath = path.join(dirPath, file);
      arrayOfFiles.push(filePath);
      console.log(filePath);
      //identificatorMd(filePath);
     console.log(identificatorMd(filePath));
     
     //console.log(readMd(filePath));
      
      
    }
  })
}




module.exports = {
  //identificator, 
  existPath, absolute, checkLink, getAllFilesMd , identificatorMd, readMd, getStats, processEnsayo//readDirectory, identificatorMd,
};
module.exports.fs = require("fs");
module.exports.path = require("path");




