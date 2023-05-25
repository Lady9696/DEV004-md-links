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
        reject("\x1B[41m"+'El arhcivo esta vacìo');
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
    console.log("\x1B[41m"+`No se encontraron enlaces en el archivo `);
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
    links.push({ href: text[2], text: text[1], file: route, });


  }
  //console.log('si diò',links, 'a que de');

  return {
    links: links
  };

}
function checkLink(result, url, text, file) {
  if (result.length === 0) {
    console.log('esta vacio');
  } else {
    const promisesArray = result.links.map((link) => {
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

/*function checkLink(result, url, text, file) {
  // valida result length === 0
  if (result.length === 0) {
    console.log('esta vacio');
  } else {
    const promisesArray = result.links.map((link) => {
      /*const objectTrue = {
        href: url,
        file: file,
        text: text,

      };

      //console.log(link.href, 'si soyyy');
      //console.log(link1, '?????');
      return fetch(link.href).then((response) => {
       
        link.status = response.status
        link.ok = response.statusText
        objectTrue.status = link.status;
        objectTrue.ok = link.ok;
        objectTrue.href = link.href;
        objectTrue.file = link.file;
        objectTrue.text = link.text;
        
        if (response.status >= 200 && response.status <= 299) {
          //console.log(objectTrue, 'porfa');
          //resolve(show);
          //console.log(result);
          //return objectTrue
          return link
        } else {
          //return objectTrue
          return link
        }
        //link.status= resp.status,
        // link.ok= resp.statusText
        //console.log(link, 'link');
        //return link;

      }).catch((error) => {
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
         //return objectTrue2
         return link
        } else{
          return link
        }
         
       
      })

    })
    //console.log(promisesArray, 'promedas');
    return Promise.all(promisesArray)


  }

}

*/
// aquì estoy verificando si el link esta disponible o kha
// function checkLink(url, text, file) {
//   //let objectTrue = [];
//   return new Promise((resolve, reject) => {

//     // aquì utilizo axios
//     return axios.get(url)
//       //armando el objeto
//       // la promesa
//       .then(response => {
//         //console.log(response.status, 'este es el response');
//         const result = {
//           href: url,
//           file: file,
//           text: text,
//           status: response.status,
//           ok: response.statusText,

//         };
//         // saco los values 
//         const show = Object.values(result);

//         if (response.status >= 200 && response.status <= 299) {
//          return show
//           //resolve(show);
//           //console.log(result);
//         } else {

//           //resolve(show);
//           return show
//         }
//       })
//       .catch(error => {
//         const result2 = {
//           href: url,
//           file: file,
//           text: text,
//           status: error.response ? error.response.status : '404',
//           ok: error.response ? error.response.statusText : 'fail',
//         };
//         const showError = Object.values(result2);
//         if (error.response && error.response.status >= 400 && error.response.status <= 499) {
//           //console.log(error.response.status,'error');
//           //console.log(error.sta, 'el obejto error');

//           //reject(showError);
//           return showError

//         } else if (error.response && error.response.status >= 500 && error.response.status <= 599) {
//           return showError
//           //reject(showError);
//           //return result2
//         } else {
//           //reject(showError);
//           return showError
//         }



//         //return showError

//       });
//   })
// }


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
    console.log("\x1B[38;2;255;151;203m"+'Archivo encontrado de la ruta ingresada : ', "\x1b[35m"+file);

    //console.log(identificatorMd(file), '**************')

  })
  return arrayOfFiles
  //return arrayOfFiles
  //console.log(arrayOfFiles, 'llalalalaal');

}

let indice = 0;
const itera = (directoryFile, routeAbsolute) => {
  //funciòn que me itere

  if (directoryFile[indice]) {

    // El archivo es un archivo Markdown (.md)
    // Realiza las acciones que necesites con el archivo
    console.log(directoryFile[indice], 'el archivos md');
    //ahora los leo invocando la funciòn nuevamente
    readMd(directoryFile[indice])
      .then((data) => {

        //

        //console.log(result2, '----------------------')
        if (indice <= directoryFile.length) {
          //console.log( directoryFile.length, '++++++++++++++++');
          indice++//va aumentar en 1
          //console.log(indice, '**********');
          itera(directoryFile, routeAbsolute)//tiene el valor 1
          let result2 = processEnsayo(data, routeAbsolute);
          return result2
          

        }

      })// este es el catch de readfile
      .catch((error) => {
        console.log(error, 'este es el error');
      })
    }
  }
    //readMd



    module.exports = {

      existPath, absolute, checkLink, getAllFilesMd, identificatorMd, readMd, getStats, processEnsayo, itera,//readDirectory, identificatorMd,
    };
    module.exports.fs = require("fs");
    module.exports.path = require("path");

