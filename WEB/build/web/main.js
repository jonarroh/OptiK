const login = document.getElementById('login');
login.addEventListener('click', async function () {
	localStorage.setItem('vistaActual', '');
	const datos = {
		datosUsuario: JSON.stringify({
			nombre: document.getElementById('nombre').value,
			contrasenia: document.getElementById('contrasenia').value
		})
	};
	//agregar is-loading como clase al boton
	login.classList.add('is-loading');
	const response = await fetch(
		'http://localhost:8080/Optik/api/login/ingresar',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(datos)
		}
	);
	const data = await response.json();
	if (data.result == 0) {
		login.classList.remove('is-loading');
		mostrarAlerta('error', 'Usuario o contraseña incorrectos');
		return;
	}
	//agregar en el localstorage el token
	localStorage.setItem('token', '1');
	window.location.href = 'modulos/';
});

function mostrarAlerta(icon, mensaje) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: true,
		timer: 3000,
		timerProgressBar: true
	});

	Toast.fire({
		icon: icon,
		title: mensaje
	});
}
