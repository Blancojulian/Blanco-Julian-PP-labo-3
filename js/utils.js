export const capitalizarPrimeraLetra = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const calcularPromedio = (lista = []) => {

    if (lista.length <= 0) {
        throw new Error('La lista debe contener personas');
    }
    console.log(lista);
    const suma = lista.reduce((acumulador, vehiculo) => {
        return acumulador + vehiculo.velMax;
    }, 0);
    
    return (suma / lista.length).toFixed(2);
}

export const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) =>object[key] = value);
    return object;
}