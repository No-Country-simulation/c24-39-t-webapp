import { useState } from 'react';
import './UserLogin.css';
import UserInputField from '../UserInputField';
import UserDataButton from '../UserDataButton';

const UserLogin = ({ navigateToRegister }) => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userLogin, setUserLoginButton] = useState('Iniciar Sesión');
    const [error, setError] = useState('');

    const sendUserLogin = async (e) => {
        e.preventDefault();

        let sendUserLogin = {
            userEmail, 
            userPassword
        };
        console.log(sendUserLogin); // TODO eliminar el console.log

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendUserLogin),
            });
      
            if (response.ok) {
                console.log('Inicio de sesión exitoso'); // TODO eliminar este console.log
                setUserEmail('');
                setUserPassword('');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al iniciar sesión');
            }
        } catch (err) {
                console.error('Error en la solicitud:', err);
                setError('Error de conexión. Por favor, intente más tarde.');
            }
        }

    return (
        <section className='user-login'>
            <form onSubmit={sendUserLogin}>
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
            <section className='user-login__navigate'>
                <p>
                    ¿No tienes cuenta?{' '} Regístrate {' '}
                    <a href='#' onClick={navigateToRegister}>
                        aquí
                    </a>
                </p>
            </section>
        </section>
    );
}

export default UserLogin;
