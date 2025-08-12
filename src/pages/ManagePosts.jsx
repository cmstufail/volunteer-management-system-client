import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

// components
import { useAuth } from '../context/AuthProvider';
import useAxiosSecure from '../pages/shared/hooks/useAxiosSecure';
import Table from './shared/Table';
import useTitle from './shared/hooks/UseTitle';
import LoadingSpinner from './shared/LoadingSpinner';
import Container from './shared/Container';

const ManagePosts = () => {

  useTitle( 'Manage Posts' );

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [ myPosts, setMyPosts ] = useState( [] );
  const [ receivedRequests, setReceivedRequests ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  const myPostsColumns = [
    { header: '#', align: 'center' },
    { header: 'Post Title', align: 'left' },
    { header: 'Category', align: 'center' },
    { header: 'Actions', align: 'center' },
  ];

  const receivedRequestsColumns = [
    { header: '#', align: 'center' },
    { header: 'Post Title', align: 'left' },
    { header: 'Applicant Name', align: 'center' },
    { header: 'Applicant Email', align: 'center' },
    { header: 'Status', align: 'center' },
    { header: 'Actions', align: 'center' },
  ];

  const fetchData = useCallback( () => {
    if ( !user?.email ) {
      setLoading( false );
      return;
    }
    setLoading( true );
    const myPostsPromise = axiosSecure.get( `/my-posts/${ user.email }` );
    const receivedRequestsPromise = axiosSecure.get( `/manage-requests/${ user.email }` );

    Promise.all( [ myPostsPromise, receivedRequestsPromise ] )
      .then( ( [ myPostsRes, receivedRequestsRes ] ) => {
        setMyPosts( myPostsRes.data );
        setReceivedRequests( receivedRequestsRes.data );
      } )
      .catch( error => console.error( "Error fetching data:", error ) )
      .finally( () => setLoading( false ) );
  }, [ user, axiosSecure ] );


  useEffect( () => {
    if ( !authLoading ) {
      fetchData();
    }
  }, [ authLoading, fetchData ] );


  const handleDelete = ( id ) => {
    Swal.fire( {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        axiosSecure.delete( `/post/${ id }` )
          .then( res => {
            if ( res.data.deletedCount > 0 ) {
              Swal.fire( 'Deleted!', 'Your post has been deleted.', 'success' );
              setMyPosts( myPosts.filter( post => post._id !== id ) );
            }
          } );
      }
    } );
  };

  const handleApprove = ( id ) => {
    axiosSecure.patch( `/request/approve/${ id }` )
      .then( res => {
        if ( res.data.modifiedCount > 0 ) {
          Swal.fire( 'Approved!', 'The request has been approved.', 'success' );
          fetchData();
        }
      } )
      .catch( err => {
        console.error( "Approve failed:", err );
        Swal.fire( 'Error!', err.message || 'Could not approve request.', 'error' );
      } );
  };


  const handleReject = ( id ) => {
    Swal.fire( {
      title: 'Are you sure?',
      text: "Do you want to reject this volunteer request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        axiosSecure.patch( `/request/reject/${ id }` )
          .then( res => {
            if ( res.data.success ) {
              Swal.fire( 'Rejected!', 'The request has been rejected.', 'success' );
              fetchData();
            }
          } )
          .catch( err => {
            console.error( "Reject failed:", err );
            Swal.fire( 'Error!', err.message || 'Could not reject request.', 'error' );
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
      <div className="md:px-3 xl:px-2 py-12 my-16 min-h-[calc(100vh-200px)]">
        <h2 className="text-3xl font-bold text-center mb-10">Manage Your Activities</h2>

        {/* section 1: My Volunteer Need Post */ }
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 border-l-4 border-primary pl-4">My Volunteer Need Posts</h3>
          { myPosts && myPosts.length > 0 ? (
            <Table
              columns={ myPostsColumns }
              data={ myPosts }
              renderRow={ ( post, index ) => (
                <tr key={ post._id } className="hover">
                  <td className="p-3 text-center">{ index + 1 }</td>
                  <td className="p-3 text-left">{ post.postTitle }</td>
                  <td className="p-3 text-center">{ post.category }</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link to={ `/update-post/${ post._id }` } className="btn btn-sm btn-info text-white"><FaEdit /></Link>
                      <button onClick={ () => handleDelete( post._id ) } className="btn btn-sm btn-error text-white"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ) }
            />
          ) : (
            <p className="p-4 bg-yellow-100 text-yellow-800 rounded-md">You have not created any posts yet.</p>
          ) }
        </div>

        {/* section 2: Received Volunteer Requests */ }
        <div>
          <h3 className="text-2xl font-semibold mb-6 border-l-4 border-secondary pl-4">Received Volunteer Requests</h3>
          { receivedRequests && receivedRequests.length > 0 ? (
            <Table
              columns={ receivedRequestsColumns }
              data={ receivedRequests }
              renderRow={ ( req, index ) => (
                <tr key={ req._id } className="hover">
                  <td className="p-3 text-center">{ index + 1 }</td>
                  <td className="p-3 text-left">{ req.postTitle }</td>
                  <td className="p-3 text-center">{ req.volunteerName }</td>
                  <td className="p-3 text-center">{ req.volunteerEmail }</td>
                  <td className="p-3 text-center"><span className={ `badge ${ req.status === 'requested' ? 'badge-warning' : req.status === 'approved' ? 'badge-success' : 'badge-error text-white' }` }>{ req.status }</span></td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={ () => handleApprove( req._id ) } className="btn btn-sm btn-success text-white" disabled={ req.status !== 'requested' }><FaCheck /></button>
                      <button onClick={ () => handleReject( req._id ) } className="btn btn-sm btn-error text-white" disabled={ req.status !== 'requested' }><FaTimes /></button>
                    </div>
                  </td>
                </tr>
              ) }
            />
          ) : (
            <p className="p-4 bg-blue-100 text-blue-800 rounded-md">No volunteer requests received for your posts yet.</p>
          ) }
        </div>
      </div>
    </Container>
  );
};

export default ManagePosts;