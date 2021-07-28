import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import validator from 'validator'
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/UseForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailAndPasswordName } from '../../actions/auth';

const RegisterSceen = () => {
    
    const  [values , handleInputChange ] = useForm({
        name:'',
        password:'',
        password2:'',
        email:'',
        
    });

    const {name,password,password2,email}= values;

    const handleSubmit=(e)=>{
        e.preventDefault();
        //validacion
        if( isFormValid() ){
            dispatch( startRegisterWithEmailAndPasswordName(email,password,name) );
        }
    };

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);

    const isFormValid=()=>{
        if(name.trim().length === 0){
            dispatch( setError('El nombre es requerido') );
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch( setError('No es un email valido') );
            return false;
        }else if( password !== password2 || password.length < 5 ){
            dispatch( setError('Ambos passwordS debe ser iguales y no deben de tener menos de 5 caracteres') );
            return false;
        };

        dispatch( removeError() );
        return true;
    };

    return (
        <>
        <h3 className='auth__title' >Registrar</h3>

        {
            msgError &&
            <div className='auth__alert-error' >{msgError}</div>
        }

        <form
            onSubmit={handleSubmit}
            class="animate__animated animate__fadeIn animate__faster"
        >
            <input
                type='text'
                name='name'
                placeholder='Tu Nombre'
                className='auth__input'
                value={name}
                onChange={handleInputChange}
            />
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
            <input
                type='password'
                name='password2'
                placeholder='Repetir Contraseña'
                className='auth__input'
                value={password2}
                onChange={handleInputChange}
            />
            <button
                type='submit'
                className='btn btn-primary btn-block mb-5'
            >Registrar</button>
            <hr/>
            
            <Link
                to='/auth/login'
                className='link'
            >Ya estas registardo?</Link>
        </form>
    </>
    )
}

export default RegisterSceen
