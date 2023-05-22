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
    links.push({ href: text[2], text: text[1], file: route, });


  }
  //console.log('si diò',links, 'a que de');

  return {
    links: links
  };

}
function checkLink(result, url, text, file) {
  // valida result length === 0



  const promisesArray = result.links.map((link) => {
    console.log(link.file, 'este es el link');
    //console.log(link, '?????');
    return fetch(link.href).then((response) => {
      link.status = response.status
      link.ok = response.statusText
      if (response.status >= 200 && response.status <= 299) {
        link1.status = link.status;
        link1.ok = link.ok;
        console.log(link1, 'porfa');
        //resolve(show);
        //console.log(result);
      } else {

        //resolve(show);
        return show
      }





      //link.status= resp.status,
      // link.ok= resp.statusText
      //console.log(link, 'link');
      //return link;
    }).catch((error) => {
      link.status = error.response ? error.response.status : '404',
        link.ok = error.response ? error.response.statusText : 'fail'
      return link;
    })

  })
  //console.log(promisesArray, 'promedas');
  return Promise.all(promisesArray)


}


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




