import Empleado from "./Empleado.js";
import Cliente from "./Cliente.js";
import generarLista from "./lista.js";
import generarTabla from "./tabla.js";
import { COLUMNAS, FILTROS } from "./constantes.js";
import { capitalizarPrimeraLetra, calcularPromedio, formDataToObject } from "./utils.js";
import Terrestre from "./Terrestre.js";
import Aereo from "./Aereo.js";
import Vehiculo from "./Vehiculo.js";

const jsonPersonas = `[
    {
        "id": 14,
        "modelo": "Ferrari F100",
        "anoFab": 1998,
        "velMax": 400,
        "cantPue": 2,
        "cantRue": 4
    },
    {
        "id": 51,
        "modelo": "Dodge Viper",
        "anoFab": 1991,
        "velMax": 266,
        "cantPue": 2,
        "cantRue": 4
    },
    {
        "id": 67,
        "modelo": "Boeing CH-47 Chinook",
        "anoFab": 1962,
        "velMax": 302,
        "altMax": 6,
        "autonomia": 1200
    },
    {
        "id": 666,
        "modelo": "Aprilia RSV 1000 R",
        "anoFab": 2004,
        "velMax": 280,
        "cantPue": 0,
        "cantRue": 2
    },
    {
        "id": 872,
        "modelo": "Boeing 747-400",
        "anoFab": 1989,
        "velMax": 988,
        "altMax": 13,
        "autonomia": 13450
    },
    {
        "id": 742,
        "modelo": "Cessna CH-1 SkyhookR",
        "anoFab": 1953,
        "velMax": 174,
        "altMax": 3,
        "autonomia": 870
    }
]`;

function generarArrayPersonas(json) {
    const arrayPersonas = JSON.parse(json);
    const newArray = [];
    let persona = null;

    for (const p of arrayPersonas) {

        persona = null;
        if (p.hasOwnProperty('cantPue') && p.hasOwnProperty('cantRue')) {
            persona = new Terrestre(p)
        } else if (p.hasOwnProperty('altMax') && p.hasOwnProperty('autonomia')) {
            persona = new Aereo(p)
        }
        persona && newArray.push(persona);
    }

    return newArray;
}
const generarCheckboxColumnas = () => {
    const arrColumnas = Object.values(COLUMNAS);
    const fragment = new DocumentFragment();
    let chbx = null;
    let label = null;

    arrColumnas.forEach((columna) => {
        chbx = document.createElement('input');
        label = document.createElement('label');
        chbx.type = 'checkbox';
        chbx.value = columna;
        chbx.checked = true;
        chbx.classList.add('checkbox-columna');
        label.appendChild( document.createTextNode(capitalizarPrimeraLetra(columna)) );
        
        fragment.appendChild(chbx);
        fragment.appendChild(label);

    });
    //divCheckbox.appendChild(fragment);
    return fragment;
}



window.addEventListener('DOMContentLoaded', () => {

        
    const tabla = document.getElementById('tabla-datos');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnAgregar = document.getElementById('btn-agregar');
    const btnSeleccionar = document.getElementById('btn-seleccionar');
    const btnDeseleccionar = document.getElementById('btn-deseleccionar');
    const divCheckbox = formDatos?.querySelector('.container-checkbox');
    const inputTipo = formAbm.querySelector('.tipo');
    const inputFiltro = formDatos.querySelector('.filtro');

    let abmToggle = document.querySelector('.abm').style.display === 'none';
    let esModificar = false;

    const lista = generarLista(generarArrayPersonas(jsonPersonas));
    const {cargarTabla, agregarRow, setVisibilidadColumna} = generarTabla(tabla, lista.getLista(), Object.values(COLUMNAS))

    const switchAbm = (esModificar = false) => {
        const divdatos = document.querySelector('.datos')
        const divAbm = document.querySelector('.abm');
        if (!abmToggle) {
            divAbm.style.display = 'block';
            divdatos.style.display = 'none';

        } else {
            divAbm.style.display = 'none';
            divdatos.style.display = 'block';
        }
        
        const optDiv = document.getElementById('opciones-tipo');
        if (esModificar) {
            optDiv.style.display = 'none';
        } else {
            optDiv.style.display = 'block';

        }
        abmToggle = !abmToggle;
    }

    const setCheckboxs = (isChecked) => {

        const querySelector = `input[type=checkbox]${isChecked ? ':not(:checked)' : ':checked'}`;
        const checkboxs = divCheckbox.querySelectorAll(querySelector);

        checkboxs.forEach((chbx) => {
            chbx.checked = isChecked;
            setVisibilidadColumna(chbx.value, isChecked);
        });
    }

    const cargarFormAbm = (vehiculo) => {

        formAbm.querySelector('input[name="id"]').value = vehiculo.id;
        formAbm.querySelector('input[name="modelo"]').value = vehiculo.modelo;
        formAbm.querySelector('input[name="anoFab"]').value = vehiculo.anoFab;
        formAbm.querySelector('input[name="velMax"]').value = vehiculo.velMax;

        if (vehiculo instanceof Terrestre) {
            formAbm.querySelector('select[name="tipo"]').value = FILTROS.TERRESTRE;

            formAbm.querySelector('input[name="cantPue"]').value = vehiculo.cantPue;
            formAbm.querySelector('input[name="cantRue"]').value = vehiculo.cantRue;

        } else if (vehiculo instanceof Aereo) {
            formAbm.querySelector('select[name="tipo"]').value = FILTROS.AEREO;

            formAbm.querySelector('input[name="altMax"]').value = vehiculo.altMax;
            formAbm.querySelector('input[name="autonomia"]').value = vehiculo.autonomia;
        }
    }


    try {

        divCheckbox.appendChild(generarCheckboxColumnas());
        cargarTabla(lista.getLista());
        //console.log('LISTA FILTRADA: ');
        //console.log(lista.filtarLista('empleados'));

    } catch (err) {
        console.log(err);
    }
    //setCheckboxs(false);
        
        
    btnAgregar.addEventListener('click', () => switchAbm());

    formAbm.addEventListener('reset', () => {
        esModificar = false;
        switchAbm()
    });

    formAbm.addEventListener('submit', function(event) {

        try {
            event.preventDefault();
            let persona = null;
            const formData = new FormData(this);
            const obj = formDataToObject(formData);
            obj.id = lista.getLastId();
            
            if (inputTipo.value === FILTROS.TERRESTRE) {
                persona = new Terrestre(obj);

            } else if (inputTipo.value === FILTROS.AEREO) {
                persona = new Aereo(obj);  
            } else {
                throw new Error('Debe seleccionar un tipo de vehiculo');
            }
            console.log(persona);

            lista.addItem(persona);
            agregarRow(persona);
            //cargarTabla();
            
            this.reset();
            
        } catch (err) {
            console.log('Error al agregar persona: \n' + err.message); 
            alert('Error al agregar persona: \n' + err.message);       
        }
    });
    //change no funciona bien, a veces haciendo click al label cambiaba eñ checkbox o deseleccionaba todos
    divCheckbox.addEventListener('click', (event) => {
        
        const target = event.target;
        if (target.tagName === 'INPUT') {
            
            //console.log(target.tagName);
            setVisibilidadColumna(target.value, target.checked);
        }
    });

    btnSeleccionar.addEventListener('click', () => setCheckboxs(true));

    btnDeseleccionar.addEventListener('click', () => setCheckboxs(false));
    
    btnCalcular.addEventListener('click', function (event) {
        try {
            event.preventDefault();
            const promedio = calcularPromedio(lista.filtarLista(inputFiltro.value));
            const inputPromedio = this.parentElement.querySelector('input[name="promedio"]');
            inputPromedio.value = promedio;
        } catch (err) {
            console.log(err);
        }
    });

    inputTipo.addEventListener('change', (event) => {
        const option = event.currentTarget.value;
        const optionTerrestre = formAbm.querySelector('.opciones-terrestre');
        const optionAereo = formAbm.querySelector('.opciones-aereo');

        // es para probar no me mate
        if (!esModificar) {
            
            if (option === FILTROS.TERRESTRE) {
                optionTerrestre.style.display = 'block';
                optionAereo.style.display = 'none';
            } else if (option === FILTROS.AEREO) {
                optionTerrestre.style.display = 'none';
                optionAereo.style.display = 'block';
            } else {
                optionTerrestre.style.display = 'none';
                optionAereo.style.display = 'none';
            }
        }

    });

    inputFiltro.addEventListener('change', (event) => {
        const opcion = event.currentTarget.value;
        cargarTabla(lista.filtarLista(opcion));

    });
//dblclick
    tabla.querySelector('tbody')?.addEventListener('dblclick', (event) => {
        const target = event.target.closest('TR');
        const id = target?.getAttribute('id-row');
        //alert(lista.getItem(id))
        if (target?.tagName === 'TR' && id) {
            esModificar = true;
            cargarFormAbm(lista.getItem(id))
            switchAbm(true);
            
        }
    });

    tabla.querySelector('thead')?.addEventListener('click', (event) => {
        const target = event.target;
        const id = target?.getAttribute('id-row');

        if (target.tagName === 'TH') {
            lista.ordenarLista(target.getAttribute('columna'));
            cargarTabla(lista.getLista());
            console.log(target.tagName);
        }
    })
});
