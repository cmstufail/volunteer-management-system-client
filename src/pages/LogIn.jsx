import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// components
import { useTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthProvider';
import signIn from '../assets/lotties/signin.json';
import useTitle from './shared/hooks/UseTitle';

const LogIn = () => {

  useTitle( 'Login' );

  const [ rememberMe, setRememberMe ] = useState( false );

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { login, loginWithGoogle, loginWithGithub, resetPassword } = useAuth();

  const [ formData, setFormData ] = useState( { email: '', password: '' } );
  const [ errors, setErrors ] = useState( {} );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    if ( errors[ name ] ) {
      setErrors( ( prev ) => ( { ...prev, [ name ]: '' } ) );
    }
  };

  const validate = () => {
    const newErrors = {};
    if ( !formData.email.includes( '@' ) ) newErrors.email = 'Valid email required';
    if ( !formData.password ) newErrors.password = 'Password is required';
    setErrors( newErrors );
    return Object.keys( newErrors ).length === 0;
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    if ( !validate() ) return;
    setIsLoading( true );

    try {
      await login( formData.email, formData.password, rememberMe );
      toast.success( 'Login successful! Welcome back!' );
      Swal.fire( {
        icon: 'success',
        title: 'Login successfull!',
        text: 'You have successfully logged into your account.',
        showConfirmButton: false,
        timer: 2000
      } ).then( () => {
        navigate( from, { replace: true } );
      } );

    } catch ( error ) {
      console.error( 'Login failed:', error );
      let errorMessage = 'Login failed. Please check your credentials.';
      if ( error.code === 'auth/invalid-credential' ) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if ( error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' ) {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      toast.error( errorMessage );
      Swal.fire( {
        icon: 'error',
        title: 'Login Failed!',
        text: errorMessage,
        confirmButtonText: 'OK'
      } );
    } finally {
      setIsLoading( false );
    }
  };

  const handleSocialLogin = async ( providerFunc ) => {
    setIsLoading( true );
    try {
      await providerFunc();
      toast.success( 'Login successful!' );
      Swal.fire( {
        icon: 'success',
        title: 'Logged In!',
        text: 'You have successfully logged in with your social account.',
        showConfirmButton: false,
        timer: 2000
      } ).then( () => {
        navigate( from, { replace: true } );
      } );
    } catch ( error ) {
      console.error( 'Social login failed:', error );
      let errorMessage = 'Social login failed. Please try again.';
      if ( error.code === 'auth/popup-closed-by-user' ) {
        errorMessage = 'Authentication window was closed. Please try again.';
      }
      toast.error( errorMessage );
      Swal.fire( {
        icon: 'error',
        title: 'Login Failed!',
        text: errorMessage,
        confirmButtonText: 'OK'
      } );
    } finally {
      setIsLoading( false );
    }
  };

  const handleResetPassword = () => {
    Swal.fire( {
      title: 'Forgot Password?',
      text: "Please enter your registered email address.",
      input: 'email',
      inputPlaceholder: 'Enter your email here',
      showCancelButton: true,
      confirmButtonText: 'Send Reset Email',
      showLoaderOnConfirm: true,
      preConfirm: ( email ) => {
        return resetPassword( email )
          .then( () => {
            return true;
          } )
          .catch( error => {
            Swal.showValidationMessage( `Request failed: ${ error.message }` );
          } );
      },

      allowOutsideClick: () => !Swal.isLoading()
    } ).then( ( result ) => {

      if ( result.isConfirmed ) {
        Swal.fire( {
          icon: 'success',
          title: 'Email Sent!',
          text: 'A password reset link has been sent to your email address.'
        } );
      };
    } );
  };



  return (
    <div className={ `min-h-screen flex items-center justify-center px-4 py-8 -mt-8 transition-all duration-300 gap-6 ${ isDark ? 'bg-dark-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
      <div className={ `w-full max-w-md rounded-lg shadow-md p-8 transition-all duration-300 ${ isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900' }` }>
        <h2 className="text-center text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-center text-sm mb-6">Login to continue</p>

        <form onSubmit={ handleSubmit } className="space-y-4">
          {/* Email */ }
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={ formData.email }
              onChange={ handleChange }
              required
              className={ `w-full px-4 py-2 rounded-md border ${ errors.email ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300' } ${ isDark ? 'bg-zinc-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500' }` }
            />
            { errors.email && <p className="text-sm text-red-500 mt-1">{ errors.email }</p> }
          </div>

          {/* Password */ }
          <div className="relative">
            <input
              type={ showPassword ? 'text' : 'password' }
              name="password"
              placeholder="Password"
              value={ formData.password }
              onChange={ handleChange }
              required
              className={ `w-full px-4 py-2 pr-10 rounded-md border ${ errors.password ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300' } ${ isDark ? 'bg-zinc-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500' }` }
            />
            <span
              onClick={ () => setShowPassword( ( p ) => !p ) }
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 dark:text-gray-300"
            >
              { showPassword ? <FaEyeSlash /> : <FaEye /> }
            </span>
            { errors.password && <p className="text-sm text-red-500 mt-1">{ errors.password }</p> }
          </div>

          {/* Remember me & Forgot Password */ }
          <div className="flex items-center justify-between mt-2 text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox"
                className="accent-green-600"
                checked={ rememberMe }
                onChange={ ( e ) => setRememberMe( e.target.checked ) }
              />
              Remember me
            </label>
            <a
              href="#"
              onClick={ ( e ) => {
                e.preventDefault();
                handleResetPassword();
              } }
              className="text-primary hover:underline cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */ }
          <button
            type="submit"
            disabled={ isLoading }
            className={ `w-full py-2 px-4 rounded-md font-semibold transition cursor-pointer ${ isDark ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white' } ${ isLoading ? 'opacity-70 cursor-not-allowed' : '' }` }
          >
            { isLoading ? 'Logging in...' : 'Login' }
          </button>
        </form>

        {/* Social Login */ }
        <div className="mt-6">
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">Or</span>

            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <span className="text-base text-gray-500 dark:text-gray-400 flex justify-center mb-4">Log in with social link</span>
          <div className="flex gap-4">
            <button
              onClick={ () => handleSocialLogin( loginWithGoogle ) }
              disabled={ isLoading }
              className={ `flex items-center justify-center w-full py-2 px-4 border rounded-md transition cursor-pointer ${ isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300' }` }
            >
              <FcGoogle className="mr-2" /> Google
            </button>
            <button
              onClick={ () => handleSocialLogin( loginWithGithub ) }
              disabled={ isLoading }
              className={ `flex items-center justify-center w-full py-2 px-4 border rounded-md transition cursor-pointer ${ isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300' }` }
            >
              <FaGithub className="mr-2" /> GitHub
            </button>
          </div>
        </div>

        {/* Register Link */ }
        <p className={ `mt-6 text-sm text-center ${ isDark ? 'text-white' : 'text-gray-800' }` }>
          Don't have an account?{ ' ' }
          <Link to="/register"
            state={ location.state }
            className="text-primary font-medium underline">
            Register
          </Link>
        </p>
      </div>
      {/* Lottie Image */ }
      <Lottie style={ { width: '300px', paddingLeft: '20px', borderRadius: '20px', padding: '15px' } } animationData={ signIn } loop={ true } className={ `${ isDark ? 'bg-none' : 'shadow-sm' }` } />
    </div>
  );
}

export default LogIn




