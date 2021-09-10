const session = [false];

//const stockSetted = localStorage.getItem(alreadySetted) ?? false ;
 
let cart =[]; //carro que 
let intact;

let alreadySetted;
let stringStock;
const stockIntact = localStorage.getItem('intact') ?? false; //me dice si ya se compró algún producto
let stockSetted = localStorage.getItem('alreadySetted') ?? false; // me dice si ya se seteó el arreglo con el stock
let stockProducts = localStorage.getItem('stringStock') ?? false; //revisa si ya se seteo el stock y trae el arreglo con los productos,este es para actualizar

//falta crear funcion que coloque los elementos del carro
class Product {
  constructor(id, name, price, stock, btn, quantity){
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.btn = btn;
    this.quantity = quantity;

    function productData(){
      console.log(id, name, price, stock, btn, quantity);
      
    }
  }
    
}

class StockProduct{
  constructor(id, stock){
    this.id = id;
    this.stock= stock;
  }
}



function countProducts(){
  const getProducts = document.getElementsByClassName('sticker-container'); //funciona
  //console.trace(getProducts.length);
  const products = [];
  for(let i = 1; i <=getProducts.length; i++  ){
    products.push(i);
  }
  //console.log(products);
  //console.trace(products.length);
  return  products; 
}
countProducts(); //cuenta los productos

async function showStock(){
    
  try{let stock = await JSON.parse(localStorage.getItem('stringStock'));  
    stock.forEach((value, i)=>{
    console.log(i+1, value.id);
    let stockTag = document.getElementById(`stock-product${i+1}`);
    stockTag.innerHTML =`${value.stock}`; 
  });
    }catch(error){

    }finally{
        
    }
  
    }


async function setDefaultStock(isThereStock, stockToSet){
  if(!isThereStock){
    let stockProducts= [];
    for(let i = 1; i <=countProducts().length; i++){
      const product = new StockProduct(i, stockToSet);
      stockProducts.push(product);


    }
    localStorage.setItem('stringStock', JSON.stringify(stockProducts));
    await showStock();
    console.log(2);
    
    
  }else{
    
    await showStock();
    console.log(1);
  
    }
    
  
}

setDefaultStock(stockProducts, 5); //aquí se setea el stock por default de manera manual o se muestra el stock ya disponible








 


















// function initStock(setted = false, stock){
//   console.log(setted)
//   if(!setted){
//     const {products} = countProducts();
//     products.forEach((value, i) =>{
//       setStock(stock, i+1)
      
//     });
    
//     stockSetted.push(true);
//     const stockset = localStorage.setItem(stockSetted[0]);
    
//   }

//   return stockSetted[0];
  
// }






// const name = document.getElementById(`product${i}`);
//     const price = document.getElementById(`product-price${i}`);
//     const stock = document.getElementById(`stock-product${i}`);
//     const quantity = document.getElementById(`add-n-products${i}`);
//     console.log(name.value, quantity.value, price.value);
    
//     const product = new Product(i, name.value, price.value, stock.value, `btn${i}`, quantity.value ?? 1);
//     console.log(e, product)



//Creamos la funcion de seleccionar el btn para agregar al carro 
// for(let i = 1; i <= countProducts().length; i++){
//   //let price = document.getElementById(`product-price${i}`);
//   //let stock = 
//   //= new Product(i, `product${i}`, price.value,   ){
//   let btn = document.getElementById(`btnproduct${i}`);
//   btn.addEventListener('click', e =>{
//     e.preventDefault();
//     console.log(e);
    
    
//   } )
//   btns.push(btn);
// }

let btns = [];
let products = [];

/////////creamos lo botones y su funcion que devuelve la cantidad y 
for(let i = 1; i<= countProducts().length; i++){
  let btn = document.getElementById(`btnproduct${i}`);
  btns.push(btn);
  btn.addEventListener('click',e =>{
    e.preventDefault();
    let {save} =returnBtn(i);
    let {initiated} = reviewSession(save[0]);
    let {stockProducts} = setStock(initiated, productsStock, 5 ); //aquí se determina el stock por defecto de manera manual en el tercer parámetro

    
  });

}



//funcion que revisa si se inició sesion

function reviewSession(product){
  if(session[0]){
    let initiated = session[0];
  }else{
    const initated = session[0];
    const errors = document.querySelectorAll('.error-init-stock');
    const pTag = errors[product-1];
    pTag.innerHTML = 'Debes Iniciar Sesion';
    pTag.removeAttribute('hidden');
    setTimeout(() => {
      pTag.innerHTML='';
      pTag.setAttribute('hidden', true);

    }, 2000);
    

  }

  return initiated;
}

///////////////////////////////////////////


function returnBtn(i){
  let save = [];
  const numBtn = i;
  save.push(numBtn); //save[0] = numBtn, save[1]= quantity
  
  if(document.getElementById(`add-n-products${i}`).value == ''){
    save.push(1);
  }else{
    save.push(parseInt(document.getElementById(`add-n-products${i}`).value));
  }
  return {save};
}
/////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', e =>{
  for(let i = 1; i <= countProducts().length; i++){
  
    let name = document.getElementById(`product${i}`).innerHTML;
    let price = parseInt(document.getElementById(`product-price${i}`).innerHTML);
    let stock = parseInt(document.getElementById(`stock-product${i}`).innerHTML);
    //let quantity = document.getElementById(`add-n-products${i}`).innerHTML;
    let btn = document.getElementById(`btnproduct${i}`);
    
    const product = new Product(i, name, price, stock, btn);
    //console.log(product);
    
    
    products.push(product);
  }
});
//console.log(products);


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
        <button id='session-button' class='special-btn'>Enviar</button>
    </div>`;
    function callBtn(){
        const sessionBtn = document.getElementById('session-button');
        
        console.log(sessionBtn);
        sessionBtn.addEventListener('click', onSubmit);
    }
    callBtn();

});



function inputValueValidation(input, validations = []) { //cada cosa que se queira validar cae en un case dependiendo de cual sea
    const { value } = input;
    let isValid = true;
    let showError = document.getElementById('error-user');
    validations.forEach(validation => {
      switch (validation) {
        case 'required':
          if (!value){
            isValid = false;
            error = 'Todos los campos requeridos';
            console.log(input);
            let showError = document.getElementById('error-user');
            showError.innerHTML =  `<p class='error-text' >${error}</p>`;
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
            showError.innerHTML = `<p class='error-text' >${error}</p>`;
            setTimeout(() => {
              removeElementsByClass('error-text');
            }, 5000);
        }
        break;
      }
    });
    
    return { isValid, showError};
  }


     function onSubmit(e) { 
        e.preventDefault();
        const user = document.getElementById('user-name');
        const password = document.getElementById('password');
        const formData =  [
        [user, ['required', 'user']],
        [password, ['required', 'password']]
        ];
        
      console.log(!session[0]);  
      if(!session[0]){
        const areValids =[];
        formData.forEach(el => {
            
          const {isValid} = inputValueValidation(el[0], el[1]);
          areValids.push(isValid);

        });
        
        console.log(areValids[0], areValids[1]);
        if(areValids[1] && areValids[0]){
            const welcome = document.getElementById('welcome');
            const form = document.getElementById('session');
            welcome.innerHTML = `Bienvenido ${user.value}`;
            session.shift();
            session.push(true);
            console.trace(session);
            removeElementsByClass('btn-user');
            form.innerHTML =` <div class='btn-user'> <button id='close-session' class='btn'>Cerrar Sesión</button> </div>`;
            const btn = document.getElementById('close-session');
            btn.addEventListener('click',function(e){location.reload(e);});

            
            
     }
     }else if(session[0]){
      const initiated = document.getElementById('initiated');
      const form = document.getElementById('session');
      initiated.innerHTML = `<h2  class='slogan welcome red'>La sesión ya esta iniciada</h2>`;
      removeElementsByClass('btn-user');
      form.innerHTML =` <div class='btn-user'> <button id='close-session' class='btn'>Cerrar Sesión</button> </div>`;
      const btn = document.getElementById('close-session');
      btn.addEventListener('click',e => location.reload(e));



      setTimeout(() => {
        removeElementsByClass('red');},5000);
      

    }
     }

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}}







