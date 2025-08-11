import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from 'axios';

import Container from '../shared/Container';
import { useTheme } from '../../context/ThemeProvider';
// import useTitle from '../shared/hooks/UseTitle';

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

    // useTitle( 'Needs Volunteer' );


    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const fetchFeaturedPosts = async () => {
            try {
                const response = await axios.get( `${ import.meta.env.VITE_API_URL }/featured-posts` );
                setPosts( response.data );
            } catch ( error ) {
                console.error( "Failed to fetch featured posts:", error );
            } finally {
                setLoading( false );
            }
        };
        fetchFeaturedPosts();
    }, [] );

    if ( loading ) {
        return <div className="text-center py-20"><span className="loading loading-lg"></span></div>;
    }

    return (
        <Container>
            <div className="container mx-auto px-4 my-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Volunteer Needs Now</h2>
                    <p className={ `mt-2 ${ isDark ? 'text-gray-300' : 'text-gray-600' }` }>Join these upcoming opportunities and make a difference.</p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={ containerVariants }
                    initial="hidden"
                    whileInView="visible"
                    viewport={ { once: true, amount: 0.2 } }
                >
                    { posts.map( post => (
                        <motion.div
                            key={ post._id }
                            className="card bg-base-100 shadow-xl border dark:border-gray-700 flex flex-col"
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
                                    <FaRegCalendarAlt />
                                    <p>Deadline: { new Date( post.deadline ).toLocaleDateString() }</p>
                                </div>
                                <div className="card-actions justify-end mt-auto pt-4">
                                    <Link to={ `/post/${ post._id }` } className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        </motion.div>
                    ) ) }
                </motion.div>

                <div className="text-center mt-12">
                    <Link to="/all-posts" className="btn btn-outline btn-wide">See All</Link>
                </div>
            </div>
        </Container>
    );
};

export default VolunteerNeedsNow;

