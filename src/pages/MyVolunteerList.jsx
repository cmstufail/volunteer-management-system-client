import { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// components
import { useAuth } from '../context/AuthProvider';
import useAxiosSecure from '..//pages/shared/hooks/useAxiosSecure';
import useTitle from '../pages/shared/hooks/UseTitle';
import LoadingSpinner from './shared/LoadingSpinner';
import Container from './shared/Container';

const MyVolunteerList = () => {

  useTitle( 'My Applied Posts' );

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [ myRequests, setMyRequests ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  const fetchData = useCallback( () => {
    if ( !user?.email ) {
      setLoading( false );
      return;
    }
    setLoading( true );
    axiosSecure.get( `/my-volunteer-requests/${ user.email }` )
      .then( res => {
        setMyRequests( res.data );
      } )
      .catch( err => {
        console.error( "Error fetching volunteer requests:", err );
      } )
      .finally( () => {
        setLoading( false );
      } );
  }, [ user, axiosSecure ] );

  useEffect( () => {
    if ( !authLoading ) {
      fetchData();
    }
  }, [ authLoading, fetchData ] );

  const handleCancelRequest = ( id ) => {
    Swal.fire( {
      title: 'Are you sure?',
      text: "Do you want to cancel your volunteer request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        axiosSecure.delete( `/request/${ id }` )
          .then( res => {
            if ( res.data.success ) {
              Swal.fire( 'Cancelled!', 'Your request has been cancelled.', 'success' );
              setMyRequests( myRequests.filter( req => req._id !== id ) );
            } else {
              throw new Error( res.data.message || 'Server responded with an error.' );
            }
          } )
          .catch( () => {
            Swal.fire( 'Error!', 'Could not cancel the request.', 'error' );
          } );
      }
    } );
  };

  if ( loading || authLoading ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-10 min-h-[calc(100vh-200px)] pt-24">
        <h2 className="text-3xl font-bold text-center mb-8">My Applied Volunteer Posts</h2>

        { myRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Post Title</th>
                  <th>Category</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { myRequests.map( ( request, index ) => (
                  <tr key={ request._id } className="hover">
                    <th>{ index + 1 }</th>
                    <td>{ request.postTitle }</td>
                    <td>{ request.category }</td>
                    <td>{ new Date( request.deadline ).toLocaleDateString() }</td>
                    <td>
                      <span className={ `badge ${ request.status === 'requested' ? 'badge-warning' : 'badge-success' }` }>
                        { request.status }
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={ () => handleCancelRequest( request._id ) }
                        className="btn btn-sm btn-error text-white"
                        disabled={ request.status !== 'requested' }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No volunteer requests found.</h3>
            <p className="text-gray-500 mt-2">You have not applied for any volunteer posts yet.</p>
            <Link to="/all-posts" className="btn btn-primary mt-4">Find Opportunities</Link>
          </div>
        ) }
      </div>
    </Container>
  );
};

export default MyVolunteerList;