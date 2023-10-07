class Persona{
    
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;

        this.#controlarParametros();
    }

    toString() {

    }

    toJson() {

    }

    #controlarParametros() {

        if (this.edad <= 15) {
            throw new Error('La edad debe ser mayor a 15');
        }
        if (!this.id || !this.nombre || !this.apellido || !this.edad) {
            throw new Error('Debe ingresar un id, nombre, apellido y edad');
        }
        //console.log('log persona');
        
    }


}

export default Persona;