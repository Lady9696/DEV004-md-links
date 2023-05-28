const fs = require("fs");
const path = require("path");
//const fetch = require('node-fetch');
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
    return true

  } else {
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
//recorra

// leer archivos md 
const readMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else if (data.length === 0) {
        reject('El arhcivo esta vacìo');
      }
      resolve(data)
    });
  })
  //
}
//esto me permite extraer los links
function processEnsayo(data, route) {
  const regexMdLinks = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gm
  const singleMatch = /\[([^\[]+)\]\((.*)\)/

  const identificator = data.match(regexMdLinks);
  if (identificator === null) {
    console.log( `No se encontraron enlaces en el archivo `);

  } else {
    let links = [];
    //console.log(identificator, 'este es el extractor d elinks');
    for (let i = 0; i < identificator.length; i++) {
      const text = singleMatch.exec(identificator[i]);

      //console.log(arrObjFalse.file, 'esto es la ruta');
      links.push({ href: text[2], text: text[1], file: route, });


    }
    //console.log('si diò',links, 'a que de');
    return links
    
  }
  
}
function checkLink(links, url, text, file) {
  if (links.length === 0) {
    console.log('esta vacio');
  } else {
    
    const promisesArray = links.map((link) => {
      //console.log(promisesArray,'****');
      const objectTrue = {
        href: url,
        file: file,
        text: text,
      };
      
      return axios.get(link.href)
        .then((response) => {
          link.status = response.status;
          link.ok = response.statusText;
          objectTrue.status = link.status;
          objectTrue.ok = link.ok;
          objectTrue.href = link.href;
          objectTrue.file = link.file;
          objectTrue.text = link.text;
          if (response.status >= 200 && response.status <= 299) {
            return objectTrue;
          } else {
            return objectTrue;
          }
        })
        .catch((error) => {
          const objectTrue2 = {
            href: url,
            file: file,
            text: text,
          };
          link.status = error.response ? error.response.status : '404';
          link.ok = error.response ? error.response.statusText : 'fail';
          objectTrue2.status = link.status;
          objectTrue2.ok = link.ok;
          objectTrue2.href = link.href;
          objectTrue2.file = link.file;
          objectTrue2.text = link.text;
          if (error.response && error.response.status >= 400 && error.response.status <= 499) {
            return objectTrue2;
          } else {
            return objectTrue2;
          }
        });
    });

    return Promise.all(promisesArray);
  }
}

  
//funciòn para leer todos los archivos de los directorios
const getAllFilesMd = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {

    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFilesMd(dirPath + "/" + file, arrayOfFiles)
      //return file
    }

    else {
      const filePath = path.join(dirPath, file);
      if (identificatorMd(file)) {
        arrayOfFiles.push(filePath);
      }
    }
    console.log("\x1B[38;2;255;151;203m" + 'Archivo encontrado de la ruta ingresada : ', "\x1b[35m" + file);
    //console.log(identificatorMd(file), '**************')

  })
  return arrayOfFiles
  //return arrayOfFiles
  //console.log(arrayOfFiles, 'llalalalaal');

}
const getLinks = (mdFiles) => {
  return new Promise ((resolve, reject) => {
    let indice = 0;
    const totalmd = mdFiles.length - 1;
    const empyArray = [];
    const itera = (file) => {
      //funciòn que me itere
      // El archivo es un archivo Markdown (.md)
      // Realiza las acciones que necesites con el archivo
      //ahora los leo invocando la funciòn nuevamente
      readMd(file)
        .then((data) => {
          const result2 = processEnsayo(data, file);
          //console.log(result2, 'aaaaaaaaaaaa');
          empyArray.push(result2);
          indice++
          //console.log(result2, '----------------------')
          if (indice <= totalmd) {
            itera(mdFiles[indice])
  
          } else {
            //hacer console.log del array
            resolve (empyArray.flat());
          }
  
        })// este es el catch de readfile
        .catch((error) => {
          console.log(error, 'este es el error');
          indice++
  
          //console.log(result2, '----------------------')
          if (indice <= totalmd) {
            itera(mdFiles[indice])
  
          } else {
            //hacer console.log del array
            resolve(empyArray.flat());
          }
        })
  
    }
    itera(mdFiles[indice])
  })
 
}
//readMd


module.exports = {

  existPath, absolute, checkLink, getAllFilesMd,
   identificatorMd, readMd,
 getStats, processEnsayo, getLinks,
};
module.exports.fs = require("fs");
module.exports.path = require("path");

