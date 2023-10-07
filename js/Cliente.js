import Persona from "./Persona.js";

class Cliente extends Persona {

    constructor({id, nombre, apellido, edad, compras, telefono}) {
        super(id, nombre, apellido, edad);

        this.compras = compras;
        this.telefono = telefono;
        this.#controlarParametros();
    }

    #controlarParametros() {
        if (!this.compras || !this.telefono) {
            throw new Error('Debe ingresar compras y telefono');
        }
    }
}

export default Cliente;