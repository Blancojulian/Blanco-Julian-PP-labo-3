import { FILTROS } from "./constantes.js";
import Terrestre from "./Terrestre.js";
import Aereo from "./Aereo.js";

const generarLista = (array = []) => {

    let lista = array;
    let listaFiltrada = [];

    const getLastId = () => lista.length === 0 ? 1 : (Math.max(...lista.map((item) => item.id)) + 1);

    const addItem = (item) => {
        if (!item) {
            throw new Error('Debe ingresar una persona');
        }
        if (!item.hasOwnProperty('id')) {
            throw new Error('Debe ingresar una persona para la persona');
        }
        
        lista.push(item);
    }
    
    const deleteItem = (id) => {
        lista = lista.filter((item) => item.id === id);
    }
    
    const updateItem = (id, item) => {
        const i = lista.findIndex((item) => item.id == id);

        if (i !== 0) {
            lista[i] = item;
        }
    }

    const getItem = (id) => {
        const i = lista.findIndex((item) => item.id == id);
        let item = null;
        if (i !== 0) {
            item = lista[i];
        }
        
        return item;
    }

    const filtarLista = (filtro) => {
        filtro = filtro.toLowerCase();

        return lista.filter((item) => {
            return (filtro === FILTROS.TERRESTRE && item instanceof Terrestre) ||
            (filtro === FILTROS.AEREO && item instanceof Aereo) || filtro === FILTROS.TODOS;
        });

    }
    const ordenarLista = (campo) => {
        lista.sort((a, b) => {
            
            if (a[campo] > b[campo] || (a[campo] == undefined && b[campo])) {
                return 1;
              }
              if (a[campo] < b[campo] || (b[campo] == undefined && a[campo])) {
                return -1;
              }
              return 0;
        });
    }

    const getLista = () => structuredClone(lista);

    return {
        getLista,
        addItem,
        deleteItem,
        updateItem,
        filtarLista,
        ordenarLista,
        getItem,
        getLastId
    }
}

export default generarLista;