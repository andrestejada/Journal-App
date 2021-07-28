import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { loginWithGoogle, starLoginEmailAndPassword } from '../../actions/auth';
import { setError } from '../../actions/ui';
import { useForm } from '../../hooks/UseForm';



const LoginScreen = () => {
    
    const [values, handleInputChange,]=useForm({
        email:'luis@correo.com',
        password:'luchito'
    });

    const { email,password}=values;
    const dispatch = useDispatch(); 
    const {msgError , loading} = useSelector(state => state.ui);

    //submit del login
    const handleSubmit=(e)=>{
        e.preventDefault();
        //validar
        if( email.trim()===''|| password.trim()==='' ){
            dispatch( setError('Ambos campos son obligatorios') );
            return; 
        }
        ///paso la validacion 
        dispatch( starLoginEmailAndPassword(email,password) );
    }

    const handleLoginClick =()=>{
        dispatch( loginWithGoogle() )
    }
    return (
        <>
            <h3 className='auth__title' >Login</h3>
            {
            msgError &&
            <div className='auth__alert-error' >{msgError}</div>
            }
            <form
               onSubmit={handleSubmit}
               className="animate__animated animate__fadeIn animate__faster" 
            >
                <input
                    type='text'
                    name='email'
                    placeholder='correo@correo.com'
                    className='auth__input'
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='******'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={ loading }
                >Ingresar</button>
                <hr/>
                <div className='auth__social-networks' >
                    <p>Login con Redes Sociales</p>
                    <div 
                        className="google-btn"
                        onClick={handleLoginClick}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link
                    to='/auth/register'
                    className='link'
                >Crear Nueva Cuenta</Link>
            </form>
        </>
    )
}

export default LoginScreen