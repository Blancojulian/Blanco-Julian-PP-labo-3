
/*
const crearCelda = (texto, atributo, element = 'td') => {
    if (element !== 'td' && element !== 'th') {
        throw new Error('Elemento invalido para crear celda');
    }
    const celda = document.createElement(element);
    const textNode = document.createTextNode(texto || '');
    celda.appendChild(textNode);
    celda.setAttribute('columna', atributo)
    //celda.innerText = texto || '';
    return celda;
};

const crearRowData = (persona) => {
    const arrColumnas = Object.values(COLUMNAS);
    const row = document.createElement('tr');

    arrColumnas.forEach((columna) => {
        row.appendChild( crearCelda(persona[columna], columna) );
    });
    
    return row;
}
const generarEncabezadoTabla = () => {
    const arrColumnas = Object.values(COLUMNAS);
    const fragment = new DocumentFragment();

    arrColumnas.forEach((columna) => fragment.appendChild( crearCelda(capitalizarPrimeraLetra(columna), columna, 'th') ));
    tabla.querySelector('thead').querySelector('tr').appendChild(fragment);
}

const cargarTabla = async () => {
    
    try {
        const usuarios = lista.getLista();
        const fragment = new DocumentFragment();
        let row;
        
        usuarios.forEach((u) => {

            row = crearRowData(u);
            row.setAttribute('id-row', u.id);
            fragment.appendChild(row);
        });
        
        tabla.querySelector('tbody').appendChild(fragment);


    } catch (err) {
        alert(err.message)
    }
}

const setVisibilidadColumna = (columna, esVisible) => {
    
    const display = esVisible ? 'table-cell' : 'none';
    const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th[columna="${columna}"]`);
    const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td[columna="${columna}"]`);
    //console.log(rowsBody);
    rowsHeader.forEach(celda => celda.style.display = display);
    rowsBody.forEach(celda => celda.style.display = display);
}*/
