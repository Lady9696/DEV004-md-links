
const fs = require('fs');
const path = require('path');

//hacer una funciòn para leer direcotrios
const identificator = (routes) => {
    //para identificar si es un directorio
    fs.stat(routes, (err, stats) => {
        if (err) {
            reject(err)
        } else {
            if (!stats.isFile(routes)) {
                routes = false;
                console.log(routes);
                console.log('es un direcotiro');
                do {
                    filenames = fs.readdirSync(__dirname);
                    filenames.forEach(files => {
                        console.log(files, 'esta es el archivo del directorio');

                    });

                } while (routes = false) {

                    
                    //se utiliza esto fs.readdirSync() method 
                    //leerlo como directorio y me va entregra un array con las rutas de los archivos

                }

            } else {
                console.log('es un archivo');
            }
        }


    });


}
module.exports = {
    identificator
};
module.exports.fs = require('fs');
module.exports.path = require('path');

