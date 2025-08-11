import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create( {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
} );

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            ( config ) => {
                const token = localStorage.getItem( 'access-token' );
                if ( token ) {
                    config.headers.Authorization = `Bearer ${ token }`;
                }
                return config;
            },
            ( error ) => {
                return Promise.reject( error );
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject( requestInterceptor );
        };
    }, [] );

    useEffect( () => {
        const responseInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            async ( error ) => {
                if ( error.response && ( error.response.status === 401 || error.response.status === 403 ) ) {
                    await logout();
                    navigate( '/login' );
                }
                return Promise.reject( error );
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject( responseInterceptor );
        };

    }, [ logout, navigate ] );

    return axiosSecure;
};

export default useAxiosSecure;