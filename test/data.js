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
    console.log(file, 'es md');
    return true

  } else {
    return false
  }
}
// aquì estoy verificando si el link esta disponible o kha
function checkLink(url) {
  return new Promise((resolve, reject) => {
    // aquì utilizo axios
    return axios.get(url)
      // la promesa
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          console.log(`${url} si funciona ${response.status}`);
        } else if (response.status >= 100 && response.status <= 199) {
          console.log(`${url}  respuesta iformativacodigo ${response.status}`);
        } else if (response.status >= 300 && response.status <= 399) {
          console.log(`${url}  redirecciòn ${response.status}`);
        } else {
          console.log(`${url}  funcion pero no se cual es el response`);
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 499) {

          reject(`${url}  no está funcionando ${error.response.status}`);

        } else if (error.response && error.response.status >= 500 && error.response.status <= 599) {
          console.log(`${url} no está funcionando  ${error.response.status}`);
        } else {
          console.log(`${url} error what ${error.response}`);
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
const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      const filePath = path.join(__dirname, dirPath, "/", file);
      arrayOfFiles.push(filePath);
      identificatorMd(filePath);
    }
  })
}

/*
//hacer una funciòn para leer direcotrios
const readDirectory = (routes) => {
let filesDirectory =[];


  fs.stat(routes, (err, stats) => {
    if (err) throw err;
    // console.log(`stats: ${JSON.stringify(stats)}`);
    do {
      const filenames = fs.readdirSync(routes);
      filenames.forEach((files) => {
        filesDirectory.push(files);
        console.log(filesDirectory, "esta es el archivo del directorio");

      });
    } while (stats.isDirectory(),true);

  })


}


const fs = require('fs');

const readDirectory = (routes) => {
  fs.stat(routes, (err, stats) => {
    if (err) throw err;

    if (stats.isDirectory()) {
      fs.readdir(routes, (err, filenames) => {
        if (err) throw err;

        filenames.forEach((filename) => {
          console.log(filename, "es un archivo del directorio");
        });
      });
    }
  });
};



// const markdownLinkExtractor = require('markdown-link-extractor');

// funciòn para leer los archivos, debe ser una promesa





*/


module.exports = {
  //identificator, 
  existPath, absolute, checkLink,getAllFiles , identificatorMd  //readDirectory, identificatorMd,
};
module.exports.fs = require("fs");
module.exports.path = require("path");




