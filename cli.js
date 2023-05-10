const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./test/README.md');

mdLinks('./test/README.md')
.then((resultado)=>{
    console.log(resultado);
})
.catch((error) => {
    console.log(error)

});
