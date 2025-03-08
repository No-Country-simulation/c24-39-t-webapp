import { useState } from 'react';
import './UserDataForm.css';
import UserInputField from '../UserInputField';
import UserDataButton from '../UserDataButton';
import UserRelationshipField from '../UserRelationshipField';

const UserDataForm = ( {navigateToLogin} ) => {

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [relationship, setRelationship] = useState('');
    const [userLogin, setUserLoginButton] = useState('Registrar');
    const [error, setError] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();

        let sendFormData = {
            userName, 
            userLastName, 
            userEmail, 
            userPassword,
            relationship
        }
        console.log(sendFormData); // TODO eliminar el console.log
        // Enviar datos al servidor
        try {
            // (TODO sustituir el endpoint donde se enviarán los datos)
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendFormData),
            });

            if (response.ok) {
                console.log('Formulario enviado correctamente'); // TODO eliminar el console.log
                setUserName('');
                setUserLastName('');
                setUserEmail('');
                setUserPassword('');
                setRelationship('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Hubo un error al enviar el formulario');
            }
        } catch (err) {
            console.error('Error en la solicitud:', err);
            setError('Error de conexión. Por favor, intente más tarde.');
        }
    }

    return <section className='user-data-form'>
            <form onSubmit={sendForm}>
                <h2>Rellena el formulario para crear tu cuenta</h2>
                {error && (<div className='user-data-form__error'>{error}</div>)}
                <UserRelationshipField
                    required
                    value={relationship}
                    updateDataValue={setRelationship}
                />
                <div>
                    <UserInputField 
                        title='Nombre' 
                        placeholder='Escribe tu nombre' 
                        required
                        value={userName}
                        updateDataValue={setUserName}
                    />
                    <UserInputField 
                        title='Apellido' 
                        placeholder='Escribe tu apellido' 
                        required
                        value={userLastName}
                        updateDataValue={setUserLastName}
                    />
                </div>
                <UserInputField 
                    title='Correo Electrónico' 
                    placeholder='Escribe tu correo electrónico' 
                    required
                    value={userEmail}
                    updateDataValue={setUserEmail}
                />
                <UserInputField 
                    title='Contraseña' 
                    placeholder='Escribe tu contraseña' 
                    type='password' 
                    required
                    value={userPassword}
                    updateDataValue={setUserPassword}
                />
                <UserDataButton 
                    value={userLogin}
                    updateDataValue={setUserLoginButton}
                />
            </form>
            <section className='user-data-form__navigate'>
                <p>
                    ¿No tienes cuenta?{' '} Inicia Sesión {' '}
                    <a href='#' onClick={navigateToLogin}>
                        aquí
                    </a>
                </p>
            </section>
        </section>
}

export default UserDataForm;
