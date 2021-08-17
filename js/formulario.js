// es para poder acceder al formulario
const formulario=document.getElementById('formulario');
// para acceder al input
const inputs=document.querySelectorAll('#formulario input');
 
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos={
	usuario:false,
	nombre:false,
	password:false,
	correo:false,
	telefono:false
}
// las expresiones que se van a utilizar (objeto con varias propiedades)
const validarFormulario=(e) =>{
    switch (e.target.name){
			case "usuario":
			validarCampo(expresiones.usuario,e.target,'usuario');
			break ;

			case"nombre":
			validarCampo(expresiones.nombre, e.target,'nombre');
			break ;

			case"password":
			validarCampo(expresiones.password, e.target,'password');
			validarPassword2();
			break ;

			case"password2":
			validarPassword2();
			break ;

			case"correo":
			validarCampo(expresiones.correo,e.target,'correo');
			break ;

			case"telefono":
			validarCampo(expresiones.telefono,e.target,'telefono');
			break ;
	}
	// el switch me ayuda a saber que es lo que quiero comprobar
}

const validarCampo=(expresion,input,campo)=> {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		// document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle'); 
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle') ;
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo]=true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle') ;
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle'); 
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo]=false;
	}
}
const validarPassword2=()=>{
	const inputPassword1=document.getElementById('password');
	const inputPassword2=document.getElementById('password2');
	if (inputPassword1.value !==inputPassword2.value) {
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		// la siguiente es para el icono
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle') ;
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle'); 
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password']=false
	}else{
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		// la siguiente es para el icono
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle') ;
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle'); 
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password']=true;
	}
}

// funcion de tipo flecha, esta funcion se va a ejecutar por cada uno de los inputs, se le agrega el nombre del parametro; input, por cada inout agrgarle un even litener 
// uso del keyup:cuando el usuario presiona una tecla e el momento que la levanto se ejecuta un codigo
// el blur se usa para que tambien valide por fuera del formulario
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
}); 
// editamos acciones sobre el btn
// (e)=parametro e.. evento
formulario.addEventListener('submit',(e) => {
	// evita que la pagina vuelva a recargar cuando se trata de llenar otro espacio
	e.preventDefault();
	const terminos= document.getElementById('terminos')
	if (campos.usuario && campos-nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
	 formulario.reset();
	//  mostrar mensaje 
	document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
	setTimeout(()=>{
		document.getElementById('formulario__mensaje-correcto').classList.remove('formulario__mensaje-exito-activo');
	},5000);
	document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=>{
icono.classList.remove('formulario__grupo-correcto');
	});
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
	}
});
