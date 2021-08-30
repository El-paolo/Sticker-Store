
 


//set stock

function setStock(stock){ 
    function countProducts(){
        const products = document.querySelectorAll('.product-name');
        const allProducts = products.length;
        console.log(allProducts);
        return products;
    }    
    countProducts().forEach((value, i)=>{ 
        console.log(`stock-product${i+1}`)
        const setStock = document.getElementById(`stock-product${i+1}`);
        setStock.innerHTML = stock;
    });
}

setStock(5); //aquí se define el stock por defecto en este caso 5


//revisar a la hora de introducir las verificiciones

const initSession = document.getElementById('init-show');
initSession.addEventListener('click', function(){
    const form = document.getElementById('session');
    form.innerHTML= `<label >Nombre de Usuario</label>
                    
    <span id='error-user' ><p class=error-text ></p></span>
        <input id='user-name'  type="text">
        <label >Contraseña</label>
        <span id='error-password'></span>
        <input type="password" id='password'>

    <div class='btn-user'>
        <button id='session-button' class='btn'>Enviar</button>
    </div>`
    function callBtn(){
        const sessionBtn = document.getElementById('session-button');
        
        console.log(sessionBtn);
        sessionBtn.addEventListener('click', onSubmit);
    }
    callBtn();

});



function inputValueValidation(input, validations = []) { //cada cosa que se queira validar cae en un case dependiendo de cual sea
    const { value } = input;
    let isValid = true
    let showError = document.getElementById('error-user');
    validations.forEach(validation => {
      switch (validation) {
        case 'required':
          if (!value){
            isValid = false;
            error = 'Todos los campos requeridos';
            console.log(input);
            let showError = document.getElementById('error-user');
            showError.innerHTML =  `<p class='error-text' >${error}</p>`
            setTimeout(() => {
              removeElementsByClass('error-text');
            }, 5000);
          }
          break;
        
        case 'user':
          if( value !== 'Escalab'){
              isValid = false;
              console.log(input);
              let showError = document.getElementById('error-user');
              error = `El Usuario no existe`;
              showError.innerHTML =  `<p class='error-text' >${error}</p>`;
              setTimeout(() => {
                removeElementsByClass('error-text');
              }, 5000);
            }

          break;
        
        case 'password':
        if ( value!='' && value !== 'Escalab123') {
            isValid = false;
            error = `Contraseña incorrecta`;
            console.log(input);
            let showError = document.getElementById('error-password');
            showError.innerHTML = `<p class='error-text' >${error}</p>`
            setTimeout(() => {
              removeElementsByClass('error-text');
            }, 5000);
        }
        break;
      }
    });
    
    return { isValid, showError};
  };


     function onSubmit(e) { 
        e.preventDefault();
        const user = document.getElementById('user-name');
        const password = document.getElementById('password');
        const formData =  [
        [user, ['required', 'user']],
        [password, ['required', 'password']]
        ]
        const areValids =[];
        formData.forEach(el => {
            
          const {isValid} = inputValueValidation(el[0], el[1]);
          areValids.push(isValid);
 
        });
        
        console.log(areValids[0], areValids[1])
        if(areValids[1] && areValids[0]){
            const welcome = document.getElementById('welcome');
            welcome.innerHTML = `Bienvenido ${user.value}`
     };

     }

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}};