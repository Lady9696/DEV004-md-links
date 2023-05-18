const fs = require("fs");
const path = require("path");
const axios = require('axios');


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
    //console.log(file, 'es md');
    return file

  } else {
    //console.log('no es md')
    return false
  }
}
// 
const getStats = (route) => {
  return new Promise((resolve, reject) => {

    fs.stat(route, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }

    });
  })
}
// leer archivos md 
const readMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else
        resolve(data)
    });
  })

}
//esto me permite extraer los links
function processEnsayo(data, route) {
  const regexMdLinks = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gm
  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  
  const identificator = data.match(regexMdLinks);
  if (identificator === null) {
    console.log(`No se encontraron enlaces en el archivo `);
    return {
      links: []
    };
  }
  
  let arrObjFalse = [];
  let links = [];
  //console.log(identificator, 'este es el extractor d elinks');
  for (let i = 0; i < identificator.length; i++) {
    const text = singleMatch.exec(identificator[i]);
    arrObjFalse.push({
      href: text[2],
      text: text[1],
      file: route,
    });
    //console.log(arrObjFalse.file, 'esto es la ruta');
    links.push({ href: text[2], text: text[1], file: route,});
    
    
  }
  //console.log('si diò',links, 'a que de');
  
  return {
    links: links
  };
  
}

// aquì estoy verificando si el link esta disponible o kha
function checkLink(url, text, file) {
  //let objectTrue = [];
  return new Promise((resolve, reject) => {

    // aquì utilizo axios
    return axios.get(url)
    //armando el objeto
    // la promesa
      .then(response => {
        console.log(response.status, 'este es el response');
        const result = {
          href: url,
          file: file,
          text:text,
          status: response.status,
          statusText: response.statusText,
          
        };
        if (response.status >= 200 && response.status <= 299) {
          resolve(result);
          //console.log(result);
          
        } else if (response.status >= 100 && response.status <= 199) {
          resolve(result);
          //console.log(result);
        } else if (response.status >= 300 && response.status <= 399) {
          resolve(result);
          //console.log(result);
        } else {

          resolve(result);
          //console.log(result);
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 499) {

          reject(`${url} no está funcionando ${error.response.status}`);

        } else if (error.response && error.response.status >= 500 && error.response.status <= 599) {
          reject(`${url}  no está funcionando  ${error.response.status}`);
        } else {
          reject(`${url}  error what ${error.response}`);
        }

      });
  })
}


//funciòn para leer todos los archivos de los directorios
const getAllFilesMd = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFilesMd(dirPath + "/" + file, arrayOfFiles)
    } else {
      const filePath = path.join(dirPath, file);
      arrayOfFiles.push(filePath);

    }

  })
  return arrayOfFiles
}




module.exports = {
  //identificator, 
  existPath, absolute, checkLink, getAllFilesMd, identificatorMd, readMd, getStats, processEnsayo//readDirectory, identificatorMd,
};
module.exports.fs = require("fs");
module.exports.path = require("path");




