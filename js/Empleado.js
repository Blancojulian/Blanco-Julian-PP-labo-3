import Persona from "./Persona.js";

class Empleado extends Persona {

    constructor({id, nombre, apellido, edad, sueldo, ventas}) {
        super(id, nombre, apellido, edad);

        this.sueldo = sueldo;
        this.ventas = ventas;

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (!this.sueldo || !this.ventas) {
            throw new Error('Debe ingresar sueldo y ventas');
        }
    }
}

export default Empleado;