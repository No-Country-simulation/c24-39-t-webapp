import './FormRegister.css';
import TextField from '../TextField';
import ButtonRegister from '../ButtonRegister';

const FormRegister = () => {
    return <section className='form-register'>
            <form>
                <h2>Rellena el formulario para crear tu cuenta</h2>
                <TextField titulo='Nombre' placeholder='Escribe tu nombre'/>
                <TextField titulo='Apellido' placeholder='Escribe tu apellido'/>
                <TextField titulo='Correo Electrónico' placeholder='Escribe tu correo electrónico'/>
                <TextField titulo='Contraseña' placeholder='Escribe tu contraseña'/>
                <ButtonRegister />
            </form>
        </section>
}

export default FormRegister;