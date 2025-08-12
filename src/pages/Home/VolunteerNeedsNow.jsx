import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt } from "react-icons/fa";

import { useTheme } from '../../context/ThemeProvider';
import useAxiosSecure from '../shared/hooks/useAxiosSecure';
import LoadingSpinner from '../shared/LoadingSpinner';


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const VolunteerNeedsNow = () => {

    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const axiosSecure = useAxiosSecure();

    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const fetchFeaturedPosts = async () => {
            try {
                const response = await axiosSecure.get( `/featured-posts` );
                setPosts( response.data );
            } catch ( error ) {
                console.error( "Failed to fetch featured posts:", error );
            } finally {
                setLoading( false );
            }
        };
        fetchFeaturedPosts();
    }, [ axiosSecure ] );

    if ( loading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="my-16 px-2 md:px-3 xl:px-2">

            {/* Section Title */ }
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Volunteer Needs Now</h2>
                <p className={ `mt-2 ${ isDark ? 'text-gray-300' : 'text-gray-600' }` }>Join these upcoming opportunities and make a difference.</p>
            </div>

            {/* Cards Grid */ }
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={ containerVariants }
                initial="hidden"
                whileInView="visible"
                viewport={ { once: true, amount: 0.2 } }
            >
                { posts.map( post => (
                    <motion.div
                        key={ post._id }
                        className="card bg-base-100 shadow-xl dark:border-gray-700 flex flex-col"
                        variants={ cardVariants }
                    >
                        <figure className="h-56">
                            <img src={ post.thumbnail } alt={ post.postTitle } className="w-full h-full object-cover object-top" />
                        </figure>
                        <div className="card-body p-6 flex flex-col">
                            <div className="badge badge-info text-white h-7 flex items-center justify-center text-center p-2">
                                { post.category }
                            </div>
                            <h2 className="card-title mt-2 text-xl font-bold min-h-[3.5rem]">{ post.postTitle }</h2>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                                <FaRegCalendarAlt className={ `${ isDark ? 'text-white' : 'text-gray-800' }` } />
                                <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm` }>Deadline: { new Date( post.deadline ).toLocaleDateString() }</p>
                            </div>
                            <div className="card-actions justify-end mt-auto pt-4">
                                <Link to={ `/post/${ post._id }` } className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </motion.div>
                ) ) }
            </motion.div>

            {/* See All Button */ }
            <div className="text-center mt-12">
                <Link to="/all-posts" className="btn btn-outline btn-wide">See All</Link>
            </div>
        </div>
    );
};

export default VolunteerNeedsNow;