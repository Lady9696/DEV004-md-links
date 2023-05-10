// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
const { existPath, absolute } = require('./test/data');

const { fs, path, access, constants } = require('./test/data.js');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {

    //encadena
         if(existPath(routes)){
          console.log(existe); 
          const routeAbsolute = absolute(routes);
          
           //esAsboluta()
        }
        else{
          reject('no existe')
        }
      });

  //readfile con promesas
    /*.then(
      (absouta) => {
          if(!abolsuta){
              convertirAbsoluita()
          }
      }
    )
*/
    //anidad
    
 
}


module.exports = {
  mdLinks
};



