import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';


const AuthContext = createContext( null );

const AuthProvider = ( { children } ) => {
    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    const createUser = ( email, password, name, photoURL ) => {
        setLoading( true );
        return createUserWithEmailAndPassword( auth, email, password )
            .then( userCredential => {
                return updateProfile( userCredential.user, {
                    displayName: name,
                    photoURL: photoURL
                } ).then( () => {
                    return userCredential;
                } );
            } );
    };

    const login = ( email, password, rememberMe ) => {
        setLoading( true );
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;

        return setPersistence( auth, persistence )
            .then( () => {
                return signInWithEmailAndPassword( auth, email, password );
            } )
            .then( result => {

                const userForToken = { email: result.user.email };

                axios.post( `${ import.meta.env.VITE_API_URL }/jwt`, userForToken, { withCredentials: true } )
                    .then( res => {
                        if ( res.data.success ) {
                            console.log( 'Token created and cookie set successfully' );
                        }
                    } );

                return result;
            } );
    };

    const resetPassword = ( email ) => {
        setLoading( true );
        return sendPasswordResetEmail( auth, email );
    };

    const updateUserProfile = ( name, photo ) => {
        return updateProfile( auth.currentUser, {
            displayName: name,
            photoURL: photo
        } );
    };

    const logout = () => {
        setLoading( true );

        return axios.post( `${ import.meta.env.VITE_API_URL }/logout`, {}, { withCredentials: true } )
            .then( () => {
                return signOut( auth );
            } )
            .catch( error => {
                console.error( "Logout process failed, but signing out from Firebase anyway.", error );
                return signOut( auth );
            } );
    };

    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, ( currentUser ) => {
            setUser( currentUser );

            if ( currentUser ) {
                const userInfo = { email: currentUser.email };

                axios.post( `${ import.meta.env.VITE_API_URL }/jwt`, userInfo, { withCredentials: true } )
                    .then( () => {
                        setLoading( false );
                    } );
            } else {
                axios.post( `${ import.meta.env.VITE_API_URL }/logout`, {}, { withCredentials: true } )
                    .then( () => {
                        setLoading( false );
                    } );
            }
        } );

        return () => {
            unsubscribe();
        };
    }, [] );

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        login,
        logout,
        resetPassword,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext( AuthContext );
