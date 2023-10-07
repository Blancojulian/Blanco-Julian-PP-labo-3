import { capitalizarPrimeraLetra } from "./utils.js";

const generarTabla = (elementTable, data = [], array = []) => {
    const arrayColumnas = array;
    let tabla = elementTable

    /*
    if (!tabla || tabla.tagName !== 'TABLE') {
        throw new Error('Elemento invalido, debe ingresar una tabla');
    }*/

        
    const crearCelda = (texto, atributo, element = 'td') => {
        if (element !== 'td' && element !== 'th') {
            throw new Error('Elemento invalido para crear celda');
        }
        const celda = document.createElement(element);
        const textNode = document.createTextNode(texto || '');
        celda.appendChild(textNode);
        celda.setAttribute('columna', atributo);
        //celda.classList.add
        //celda.innerText = texto || '';
        return celda;
    };

    const crearRowData = (persona) => {
        //const arrColumnas = Object.values(COLUMNAS);
        const row = document.createElement('tr');
        row.classList.add('fila');
        arrayColumnas.forEach((columna) => {
            row.appendChild( crearCelda(persona[columna], columna) );
        });
        
        return row;
    }
    const generarEncabezadoTabla = () => {
        //const arrColumnas = Object.values(COLUMNAS);
        const fragment = new DocumentFragment();

        arrayColumnas.forEach((columna) => fragment.appendChild( crearCelda(capitalizarPrimeraLetra(columna), columna, 'th') ));
        tabla.querySelector('thead').querySelector('tr').appendChild(fragment);
    }
    const limpiarTabla = () => {
        const tbody = tabla.querySelector('tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    const cargarTabla = async (data) => {
        
        try {
            limpiarTabla();

            const fragment = new DocumentFragment();
            let row;

            data.forEach((u) => {

                row = crearRowData(u);
                row.setAttribute('id-row', u.id);
                fragment.appendChild(row);
            });
            
            tabla.querySelector('tbody').appendChild(fragment);


        } catch (err) {
            alert('Error al cargar la  tabla: ' + err.message)
        }
    }

    const agregarRow = (persona) => {
        const row = crearRowData(persona);
        row.setAttribute('id-row', persona.id);
        tabla.querySelector('tbody').appendChild(row);
    }

    const setVisibilidadColumna = (columna, esVisible) => {
        
        const display = esVisible ? 'table-cell' : 'none';
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th[columna="${columna}"]`);
        const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td[columna="${columna}"]`);
        //console.log(rowsBody);
        rowsHeader.forEach(celda => celda.style.display = display);
        rowsBody.forEach(celda => celda.style.display = display);
    }

    const setTabla = (elementTable) => {
        if (!tabla || tabla.tagName !== 'TABLE') {
            tabla = elementTable;
            generarEncabezadoTabla();
        }
    }
    

    if (tabla?.tagName === 'TABLE') {
        tabla = elementTable;
        generarEncabezadoTabla();
        cargarTabla(data);
    }

    return {
        cargarTabla,
        agregarRow,
        setVisibilidadColumna,
        setTabla
    };
}

export default generarTabla;
