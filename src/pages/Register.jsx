import Lottie from 'lottie-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import registerLottie from '../assets/lotties/register.json'
import { useTheme } from '../context/ThemeProvider'
import { AuthContext } from './../context/AuthContext';
import { useAuth } from '../context/AuthProvider';
import useTitle from './shared/hooks/UseTitle';

const Register = () => {

    useTitle( 'Register' );

    const { createUser } = useAuth( AuthContext );
    const { theme } = useTheme();

    const isDark = theme === 'dark';

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        if ( !email || !password || !name ) {
            Swal.fire( {
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill all required fields.',
            } );
            return;
        }

        if ( password.length < 6 ) {
            Swal.fire( {
                icon: 'warning',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters long.',
            } );
            return;
        }

        // create user
        createUser( email, password, name, photoURL )
            .then( () => {

                // Show success alert
                Swal.fire( {
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Welcome to our site!',
                    showConfirmButton: false,
                    timer: 2000,
                } );


                setTimeout( () => {
                    navigate( from, { replace: true } );
                }, 2000 )

                // reset form fields
                form.reset();
            } )

            .catch( error => {
                console.error( error )

                Swal.fire( {
                    icon: 'error',
                    title: 'Registration Failed!',
                    text: error.message || 'Please try again.',
                    confirmButtonText: 'OK'
                } );
            } );
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={ { width: '200px' } } animationData={ registerLottie } loop={ true } />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <form onSubmit={ handleRegister }>
                            <fieldset className="fieldset">

                                <label className="label">Name</label>
                                <input type="text" name='name' className="input" placeholder="name" />

                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />

                                <label className="label">PhotoURL</label>
                                <input type="text" name='photoURL' className="input" placeholder="PhotoURL" />

                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            {/* Register Link */ }
                            <p className={ `mt-6 text-sm text-center ${ isDark ? 'text-white' : 'text-gray-800' }` }>
                                Already have an account?{ ' ' }
                                <Link to="/login" className="text-primary font-medium underline">
                                    Log In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
