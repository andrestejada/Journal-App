import Swal from 'sweetalert2'
import {types} from '../types/type'
import {firebase,googleAuthProvider}  from '../firebase/firebaseConfig'
import { startLoading ,finishLoading } from './ui';
import { notelogOut } from './notes';

export const starLoginEmailAndPassword=(email,password)=>{
    return (dispatch)=>{
        
        dispatch( startLoading() );

        return firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({user})=>{

                dispatch( login(user.uid,user.displayName) );
                dispatch( finishLoading() );
            })
            .catch( error=> {
                console.log(error)
                dispatch( finishLoading() );
                Swal.fire('Error','Usuario o contraseña incorrectos , Intenta De Nuevo','error')
                
            })
    }
};

export const startRegisterWithEmailAndPasswordName=(email,password,name)=>{
    return (dispatch)=>{

        firebase.auth().createUserWithEmailAndPassword( email ,password )
                .then( async ({user})=> {

                    await user.updateProfile({displayName:name});
                    dispatch( login(user.uid , user.displayName ) );
                    console.log( user);
                    
                })
                .catch( e=> {
                    Swal.fire('Error', e.message ,'error');
                });
    }
};

export const loginWithGoogle=()=>{
    return (dispatch)=>{
         firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({user})=> {
                dispatch( login(user.uid,user.displayName) )
            })        
    }
};

export const startLogOut= ()=>{
    return  async(dispatch)=>{
        await firebase.auth().signOut()
        dispatch( logOut() );
        dispatch( notelogOut() );
    }
};

export const login=(uid,displayName)=>({
    type: types.login,
    payload:{
        uid,
        displayName
    }
});

export const logOut=()=>({
    type: types.logout
})