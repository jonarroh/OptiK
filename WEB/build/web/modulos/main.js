let ma = null;
let ml = null;
let mac = null;
const empleado = document.getElementById('empleado');
empleado.addEventListener('click', () => {
	cambiarEmpleado();
});
const cambiarEmpleado = async () => {
	const res = await fetch('./empleado/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de empleado.controller.js con un import dinamico
	const obj = await import('./empleado/empleado.controller.js');
	ma = obj;
};

const lenteContacto = document.getElementById('lenteContacto');
lenteContacto.addEventListener('click', () => {
	cambiarLenteContacto();
});
const cambiarLenteContacto = async () => {
	//cargamos el html de lenteContacto en el div app
	const res = await fetch('./lenteContacto/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de lenteContacto.controller.js con un import dinamico cada vez que se cambie de vista
	const obj = await import(
		'./lenteContacto/lenteContacto.controller.js'
	);
	ml = obj;
	ml.tablaLenteC('1');
};

const accesorio = document.getElementById('accesorio');
accesorio.addEventListener('click', () => {
	cambiarAccesorio();
});
const cambiarAccesorio = async () => {
	//cargamos el html de accesorio en el div app
	const res = await fetch('./accesorio/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de accesorio.controller.js con un import dinamico cada vez que se cambie de vista
	const obj = await import('./accesorio/accesorio.controller.js');
	mac = obj;
};

let usuarios = [{ nombre: 'jonathan' }, { nombre: 'andres' }];
//console.log de usuarios ordenado por nombre

let usuariosOrdenados = usuarios.sort((a, b) =>
	a.nombre.localeCompare(b.nombre)
);
console.log(usuariosOrdenados);
