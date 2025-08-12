import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt, FaSearch, FaList, FaTh } from "react-icons/fa";

import Container from './shared/Container';
import useTitle from './shared/hooks/UseTitle';
import Table from './shared/Table';
import useAxiosSecure from './shared/hooks/useAxiosSecure';
import LoadingSpinner from './shared/LoadingSpinner';


const AllPosts = () => {

    useTitle( 'All Posts' );

    const [ posts, setPosts ] = useState( [] );
    const axiosSecure = useAxiosSecure();
    const [ loading, setLoading ] = useState( true );
    const [ searchTerm, setSearchTerm ] = useState( '' );
    const [ layout, setLayout ] = useState( 'card' );

    const tableColumns = [
        { header: '#', align: 'center' },
        { header: 'Post Title', align: 'left' },
        { header: 'Category', align: 'center' },
        { header: 'Deadline', align: 'center' },
        { header: 'Action', align: 'center' },
    ];

    useEffect( () => {
        setLoading( true );
        axiosSecure.get( `${ import.meta.env.VITE_API_URL }/posts?search=${ searchTerm }` )
            .then( res => {
                console.log( res.data.map( post => post._id ) );
                setPosts( res.data );
                setLoading( false );
            } )
            .catch( err => {
                console.error( "Error fetching posts:", err );
                setLoading( false );
            } );
    }, [ axiosSecure, searchTerm ] );

    const handleSearch = ( e ) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearchTerm( searchText );
    };

    if ( loading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }


    return (
        <Container>
            <div className="mx-auto py-10 min-h-[calc(100vh-200px)] px-2 md:px-3 xl:px-2">
                <h2 className="text-3xl font-bold text-center mb-4">All Volunteer Opportunities</h2>

                <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-4">
                    <form onSubmit={ handleSearch } className="flex gap-2 w-full max-w-sm">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by Post Title..."
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary"><FaSearch /></button>
                    </form>

                    <div className="tooltip" data-tip={ layout === 'card' ? 'Switch to Table View' : 'Switch to Card View' }>
                        <button
                            onClick={ () => setLayout( layout === 'card' ? 'table' : 'card' ) }
                            className="btn btn-ghost btn-circle"
                        >
                            { layout === 'card' ? <FaList className="text-xl" /> : <FaTh className="text-xl" /> }
                        </button>
                    </div>
                </div>

                <>
                    { posts.length > 0 ? (
                        layout === 'card' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                { posts.map( post => (
                                    <div key={ post._id } className="card bg-base-100 shadow-xl dark:border-gray-700 flex flex-col">
                                        <figure className="h-56">
                                            <img src={ post.thumbnail } alt={ post.postTitle } className="w-full h-full object-cover object-top" />
                                        </figure>
                                        <div className="card-body flex flex-col">
                                            <div className="badge badge-info text-white h-7 flex items-center justify-center text-center p-2">
                                                { post.category }
                                            </div>
                                            <h2 className="card-title mt-2 min-h-[3.5rem]">{ post.postTitle }</h2>
                                            <div className="flex items-center gap-2 text-gray-500 mt-2">
                                                <FaRegCalendarAlt />
                                                <p>Deadline: { new Date( post.deadline ).toLocaleDateString() }</p>
                                            </div>
                                            <div className="card-actions justify-end mt-auto pt-4">
                                                <Link to={ `/post/${ post._id }` } className="btn btn-primary">View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        ) : (
                            <Table
                                columns={ tableColumns }
                                data={ posts }
                                renderRow={ ( post, index ) => (
                                    <tr key={ post._id } className="hover">
                                        <td className="p-3 text-center">{ index + 1 }</td>
                                        <td className="p-3 text-left">
                                            <div className="font-bold">{ post.postTitle }</div>
                                            <div className="text-sm opacity-50">{ post.location }</div>
                                        </td>
                                        <td className="p-3 text-center">{ post.category }</td>
                                        <td className="p-3 text-center">{ new Date( post.deadline ).toLocaleDateString() }</td>
                                        <td className="p-3 text-center">
                                            <Link to={ `/post/${ post._id }` } className="btn btn-sm btn-primary">View Details</Link>
                                        </td>
                                    </tr>
                                ) }
                            />
                        )
                    ) : (
                        <p className="text-center col-span-3 text-xl py-16">No posts found for your search.</p>
                    ) }
                </>
            </div>
        </Container>
    );
};

export default AllPosts;