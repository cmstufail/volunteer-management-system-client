import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaRegCalendarAlt } from 'react-icons/fa';

import useAxiosSecure from '../pages/shared/hooks/useAxiosSecure';
import { useAuth } from '../context/AuthProvider';
import useTitle from '../pages/shared/hooks/UseTitle';
import ExpandableText from '../pages/shared/ExpandableText';
import Container from '../pages/shared/Container'
import { useTheme } from '../context/ThemeProvider';
import LoadingSpinner from './shared/LoadingSpinner';

const PostDetails = () => {

    useTitle( 'Details Post' );


    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const { id } = useParams();
    console.log( "Params ID:", id );
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [ post, setPost ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useTitle( post ? post.postTitle : 'Post Details' );

    useEffect( () => {
        setLoading( true );
        axiosSecure.get( `/post/${ id }` )
            .then( response => {
                setPost( response.data );
            } )
            .catch( error => {
                console.error( "Error fetching post details:", error );
                setPost( null )
            } )
            .finally( () => {
                setLoading( false );
            } );
    }, [ id, axiosSecure ] );

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
                <p className="text-gray-500 mt-2">The post you are looking for might have been deleted or does not exist.</p>
                <Link to="/all-posts" className="btn btn-primary mt-6">Back to All Posts</Link>
            </div>
        );
    }

    return (
        <Container>
            <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-12 pt-12 px-2 md:px-3 xl:px-2">

                {/* Image Section */ }
                <div className='flex-1'>
                    <img
                        src={ post.thumbnail }
                        alt={ post.postTitle }
                        className='w-full h-auto md:h-full object-cover rounded-lg' />
                </div>

                {/* Content Section */ }
                <div className="p-6 md:p-10 flex-1">
                    <span className="text-sm font-semibold text-primary bg-primary/10 py-1 px-4 rounded-full">
                        { post.category }
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold my-4 dark:text-white">
                        { post.postTitle }
                    </h1>

                    <div className="mb-8">
                        <ExpandableText text={ post.description } maxLength={ 250 } />
                    </div>

                    {/* Post Info Grid */ }
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t dark:border-gray-700 pt-6">
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-xl text-primary" />
                            <div>
                                <p className="font-semibold">Location</p>
                                <p className={ `${ isDark ? 'text-white' : 'text-gray-800' }` }>{ post.location }</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-3">
                            <FaUsers className="text-xl text-primary" />
                            <div>
                                <p className="font-semibold">Volunteers Needed</p>
                                <p className={ `${ isDark ? 'text-white' : 'text-gray-800' }` }>{ post.volunteersNeeded }</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaRegCalendarAlt className="text-xl text-primary" />
                            <div>
                                <p className="font-semibold">Deadline</p>
                                <p className={ `${ isDark ? 'text-white' : 'text-gray-800' }` }>{ new Date( post.deadline ).toLocaleDateString() }</p>
                            </div>
                        </div>
                    </div>

                    {/* Organizer Info */ }
                    <div className="mt-6 border-t dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-bold mb-3">Organizer Information</h3>
                        <p><strong>Name:</strong> { post.organizer.name }</p>
                        <p><strong>Email:</strong> { post.organizer.email }</p>
                    </div>

                    {/* Action Button */ }
                    <div className="mt-10 text-center">
                        <Link
                            to={ `/be-a-volunteer/${ post._id }` }
                            className={ `btn btn-primary btn-lg px-12 ${ ( post.volunteersNeeded <= 0 || user?.email === post.organizer?.email ) ? 'btn-disabled' : '' }` }
                        >
                            Be a Volunteer
                        </Link>
                        { user?.email === post.organizer?.email && (
                            <p className="text-sm text-yellow-600 mt-2">You cannot apply for a post you organized.</p>
                        ) }
                        { post.volunteersNeeded <= 0 && (
                            <p className="text-sm text-red-500 mt-2">No more volunteers are needed for this post.</p>
                        ) }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PostDetails;