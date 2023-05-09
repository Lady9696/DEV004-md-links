const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./index.js');

mdLinks('./gato/existe')
.then((resultado)=>{
    console.log(resultado);
})
.catch((error) => {
    console.log(error)

});
