import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { useAuth } from '../context/AuthProvider';
import useTitle from './shared/hooks/UseTitle';

const MyProfile = () => {

    useTitle( 'My Profile' );

    const { user, updateUserProfile, loading: authLoading } = useAuth();

    const [ formData, setFormData ] = useState( {
        displayName: '',
        photoURL: ''
    } );
    const [ isEditing, setIsEditing ] = useState( false );

    useEffect( () => {
        if ( user ) {
            setFormData( {
                displayName: user.displayName || '',
                photoURL: user.photoURL || ''
            } );
        }
    }, [ user ] );

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( prev => ( { ...prev, [ name ]: value } ) );
    };

    const handleUpdate = async ( e ) => {
        e.preventDefault();
        try {
            await updateUserProfile( formData.displayName, formData.photoURL );
            Swal.fire( {
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                showConfirmButton: false,
                timer: 1500
            } );
            setIsEditing( false );
        } catch ( error ) {
            console.error( 'Update failed', error );
            Swal.fire( {
                icon: 'error',
                title: 'Update Failed',
                text: error.message || 'Something went wrong!',
            } );
        }
    };

    if ( authLoading ) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8 pt-24">
            <div className="bg-base-100 dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">My Profile</h2>

                <div className="flex flex-col items-center mb-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={ formData.photoURL || user?.photoURL || 'https://i.pravatar.cc/150' }
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <p className="text-lg font-semibold mt-4">{ user?.email }</p>
                </div>

                <form onSubmit={ handleUpdate } className="space-y-4">
                    <div>
                        <label className="label"><span className="label-text">Display Name</span></label>
                        <input
                            type="text"
                            name="displayName"
                            value={ formData.displayName }
                            onChange={ handleChange }
                            disabled={ !isEditing }
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input
                            type="text"
                            name="photoURL"
                            value={ formData.photoURL }
                            onChange={ handleChange }
                            disabled={ !isEditing }
                            className="input input-bordered w-full"
                        />
                    </div>

                    { isEditing ? (
                        <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                    ) : (
                        <div
                            role="button"
                            tabIndex={ 0 }
                            onClick={ () => setIsEditing( true ) }
                            onKeyDown={ ( e ) => { if ( e.key === 'Enter' || e.key === ' ' ) setIsEditing( true ); } }
                            className="btn btn-neutral w-full"
                        >
                            Edit Profile
                        </div>
                    ) }
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
