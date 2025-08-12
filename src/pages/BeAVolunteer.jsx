import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../pages/shared/hooks/useAxiosSecure';
import useTitle from '../pages/shared/hooks/UseTitle';
import LoadingSpinner from './shared/LoadingSpinner';
import Container from './shared/Container';

const BeAVolunteer = () => {

    useTitle( 'Apply as a Volunteer' );

    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [ post, setPost ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ suggestion, setSuggestion ] = useState( '' );


    useEffect( () => {
        axiosSecure.get( `/post/${ id }` )
            .then( res => {
                setPost( res.data );
                setLoading( false );
            } )
            .catch( err => {
                console.error( "Error fetching post data for application:", err );
                setLoading( false );
            } );
    }, [ id, axiosSecure ] );

    const handleSubmitRequest = async ( e ) => {
        e.preventDefault();

        if ( user?.email === post?.organizer?.email ) {
            return Swal.fire( { icon: 'error', title: 'Action Not Allowed', text: "You cannot apply for your own post!" } );
        }
        if ( post?.volunteersNeeded <= 0 ) {
            return Swal.fire( { icon: 'info', title: 'Sorry', text: "No more volunteers are needed." } );
        }

        const applicationData = {
            postId: post._id,
            postTitle: post.postTitle,
            category: post.category,
            deadline: post.deadline,
            organizerEmail: post.organizer.email,
            volunteerName: user.displayName,
            volunteerEmail: user.email,
            suggestion,
            status: 'requested',
        };

        try {
            const { data } = await axiosSecure.post( `/request-volunteer`, applicationData );
            if ( data.success ) {
                Swal.fire( 'Request Sent!', 'Your request has been sent successfully.', 'success' );
                navigate( '/my-volunteer-list' );
            }
        } catch ( error ) {
            console.error( error );
            Swal.fire( 'Error!', 'Failed to send your request.', 'error' );
        }
    };

    if ( loading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if ( !post ) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">Post Not Found</h2>
                <p className="text-gray-500 mt-2">The post you are trying to apply for might have been deleted or does not exist.</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="bg-base-200 py-10 px-4 pt-24">
            <div className="p-8 bg-base-100 shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold mb-8 text-center">Apply to be a Volunteer for:</h2>
                <h3 className="text-xl font-semibold mb-6 text-center text-primary">{ post.postTitle }</h3>
                <form onSubmit={ handleSubmitRequest } className="space-y-4">
                    {/* Read-only Post Information */ }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" defaultValue={ `Category: ${ post.category }` } readOnly disabled className="input input-bordered w-full" />
                        <input type="text" defaultValue={ `Deadline: ${ new Date( post.deadline ).toLocaleDateString() }` } readOnly disabled className="input input-bordered w-full" />
                    </div>

                    {/* Read-only User Information */ }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4">
                        <input type="text" defaultValue={ `Your Name: ${ user.displayName }` } readOnly disabled className="input input-bordered w-full" />
                        <input type="email" defaultValue={ `Your Email: ${ user.email }` } readOnly disabled className="input input-bordered w-full" />
                    </div>

                    {/* Editable Fields */ }
                    <div className="form-control">
                        <label className="label"><span className="label-text">Suggestion / Motivation</span></label>
                        <textarea
                            value={ suggestion }
                            onChange={ ( e ) => setSuggestion( e.target.value ) }
                            name="suggestion"
                            placeholder="Why are you a good fit for this role?"
                            className="textarea textarea-bordered w-full h-28"
                            required
                        />
                    </div>

                    <div className="form-control mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={ post.volunteersNeeded <= 0 || user?.email === post.organizer?.email }
                        >
                            Request to Volunteer
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </Container>
    );
};

export default BeAVolunteer;
