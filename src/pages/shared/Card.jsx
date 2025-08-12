import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";

const Card = ( { posts } ) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            { posts.map( post => (
                <div key={ post._id } className="card bg-base-100 shadow-xl dark:border-gray-700">
                    <figure className="h-56"><img src={ post.thumbnail } alt={ post.postTitle } className="w-full h-full object-cover object-top" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{ post.postTitle }</h2>
                        <p className="badge badge-info text-white">{ post.category }</p>
                        <div className="flex items-center gap-2 text-gray-500 mt-2">
                            <FaRegCalendarAlt />
                            <p>Deadline: { new Date( post.deadline ).toLocaleDateString() }</p>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <Link to={ `/post/${ post._id }` } className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
            ) ) }
        </div>
    )
}

export default Card
