let accesorio = [];
let accesorioActual = null;
tablaAccesorio('1');

function getElements() {
	return {
		nombre: document.getElementById('nombre'),
		marca: document.getElementById('marca'),
		precioCompra: document.getElementById('precioCompra'),
		precioVenta: document.getElementById('precioVenta'),
		existencias: document.getElementById('existencias')
	};
}

export async function guardar() {
	let { nombre, marca, precioCompra, precioVenta, existencias } =
		getElements();
	const datosAccesorio = {
		datosAccesorio: JSON.stringify({
			producto: {
				nombre: nombre.value,
				marca: marca.value,
				precioCompra: precioCompra.value,
				precioVenta: precioVenta.value,
				existencias: existencias.value
			}
		})
	};
	const response = await fetch(
		'http://localhost:8080/Optik/api/accesorio/guardar',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(datosAccesorio)
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta('error', 'no se pudo guardar el lente de contacto');
		return;
	}
	mostrarAlerta('success', 'se guardo el lente de contacto');
	tablaAccesorio(1);
	limpiarForm();
}
export async function tablaAccesorio(estatus) {
	const response = await fetch(
		'http://localhost:8080/Optik/api/accesorio/getall',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ estatus: estatus })
		}
	);
	const data = await response.json();
	if (data.error) {
		alert(data.error);
		return;
	}
	//crear la tabla
	mostrarTabla(null, data);
}

function mostrarTabla(coincidencias, data) {
	if (coincidencias) {
		data = coincidencias;
	} else {
		accesorio = data;
	}
	let contenido = '';
	console.table(data);
	data.forEach((accesorio, index) => {
		const { producto } = accesorio;
		contenido +=
			/*html*/
			`
    <tr>
    <td>${producto.nombre}</td>
		<td>${producto.codigoBarras}</td>
    <td>${producto.marca}</td>
    <td>${producto.precioCompra}</td>
    <td>${producto.precioVenta}</td>
    <td>${producto.existencias}</td>

		<td><button class="button is-primary has-icons-left" type='button' onclick="mac.cargarForm(${index})">
		<span class="icon is-left pt-2">
							<icon-eye></icon-eye>
						</span>
						
		</button></td>
    `;
		if (producto.estatus === 1) {
			contenido += `<td><button class="button is-danger has-icons-left" type='button' onclick="mac.eliminarAccesorio(${producto.idProducto})">
			<span class="icon is-left pt-2">
							<icon-delete></icon-delete>
						</span>
						
			</button></td>`;
		} else {
			contenido += `<td><button class="button is-success has-icons-left" type='button' onclick="mac.activarAccesorio(${producto.idProducto})">
			<span class="icon is-left pt-2">
							<icon-check></icon-check>
						</span>
						</button></td>`;
		}
	});
	document.querySelector('tbody').innerHTML = contenido;
}
export function limpiarForm() {
	document.getElementById('form').reset();
	accesorioActual = null;
}
export function cargarForm(index) {
	const accesorioA = accesorio[index];
	accesorioActual = accesorioA;
	console.log(accesorioActual);
	const { producto } = accesorioA;
	document.getElementById('nombre').value = producto.nombre;
	document.getElementById('marca').value = producto.marca;
	document.getElementById('precioCompra').value =
		producto.precioCompra;
	document.getElementById('precioVenta').value = producto.precioVenta;
	document.getElementById('existencias').value = producto.existencias;
}

export async function updateAccesorio() {
	const { producto } = accesorioActual;
	const datosAccesorio = {
		datosAccesorio: JSON.stringify({
			idAccesorio: accesorioActual.idAccesorio,
			producto: {
				idProducto: producto.idProducto,
				nombre: document.getElementById('nombre').value,
				marca: document.getElementById('marca').value,
				precioCompra: document.getElementById('precioCompra').value,
				precioVenta: document.getElementById('precioVenta').value,
				existencias: document.getElementById('existencias').value
			}
		})
	};

	const response = await fetch(
		'http://localhost:8080/Optik/api/accesorio/update',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(datosAccesorio)
		}
	);
	const data = await response.json();
	console.log(data);
	if (data.error) {
		mostrarAlerta(
			'error',
			'Nose pudo actualizar el lente de contacto'
		);
	}
	mostrarAlerta('success', 'Lente de contacto actualizado');
	tablaAccesorio(`${producto.estatus}`);
	limpiarForm();
}

export function realizarBusqueda() {
	//buscar si el valor de busqueda esta en el objeto empleado en alguna de sus propiedades
	//si lo encuentra, mostrarlo en la tabla agregando a coincidencias
	const busqueda = document.getElementById('buscar').value;
	const coincidencias = [];
	for (let i = 0; i < accesorio.length; i++) {
		const accesorioA = accesorio[i];
		//nombre sin importar mayusculas o minusculas
		if (
			accesorioA.producto.nombre
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			accesorioA.producto.marca
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			accesorioA.producto.precioCompra
				.toString()
				.includes(busqueda) ||
			accesorioA.producto.precioVenta.toString().includes(busqueda) ||
			accesorioA.producto.existencias.toString().includes(busqueda)
		) {
			coincidencias.push(accesorioA);
		}
	}
	console.table(coincidencias);
	mostrarTabla(coincidencias, null);
}

export async function eliminarAccesorio(index) {
	const response = await fetch(
		'http://localhost:8080/Optik/api/accesorio/delete',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				idProducto: index
			})
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta(
			'error',
			'no se pudo eliminar el lente de contacto'
		);
		return;
	}
	mostrarAlerta('success', 'se elimino el lente de contacto');
	tablaAccesorio('1');
}

export async function activarAccesorio(index) {
	const response = await fetch(
		'http://localhost:8080/Optik/api/accesorio/activate',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				idProducto: index
			})
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta('error', 'no se pudo activar el lente de contacto');
		return;
	}
	mostrarAlerta('success', 'se activo el lente de contacto');
	tablaAccesorio('0');
}
function mostrarAlerta(icon, mensaje) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: true,
		timer: 3000,
		timerProgressBar: true
	});

	Toast.fire({
		icon: icon,
		title: mensaje
	});
}
