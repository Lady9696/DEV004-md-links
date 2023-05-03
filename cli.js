const { mdLinks } = require ('./test.js');
mdLinks('./test.js')
.then((resultado)=>{
    console.log(resultado);
})

.catch((error) => {
    console.log(error)

});
