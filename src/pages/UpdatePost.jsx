import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import useAxiosSecure from '../pages/shared/hooks/useAxiosSecure';
import useTitle from '../pages/shared/hooks/UseTitle';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from './shared/LoadingSpinner';


const UpdatePost = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading } = useAuth();

  const [ post, setPost ] = useState( null );
  const [ loading, setLoading ] = useState( true );
  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ deadline, setDeadline ] = useState( new Date() );

  useTitle( post ? `Update: ${ post.postTitle }` : 'Update Post' );

  useEffect( () => {
    setLoading( true );
    axiosSecure.get( `/post/${ id }` )
      .then( res => {
        setPost( res.data );
        setDeadline( new Date( res.data.deadline ) );
        setLoading( false );
      } )
      .catch( err => {
        console.error( "Failed to fetch post for update:", err );
        setLoading( false );
      } );
  }, [ id, axiosSecure ] );

  const handleUpdatePost = async ( e ) => {
    e.preventDefault();
    setIsSubmitting( true );
    const form = e.target;

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt( form.volunteersNeeded.value ),
      deadline,
    };

    try {
      const { data } = await axiosSecure.put( `/post/${ id }`, updatedPost );
      if ( data.modifiedCount > 0 ) {
        Swal.fire( 'Updated!', 'Your post has been updated successfully.', 'success' );
        navigate( '/manage-posts' );
      } else {
        Swal.fire( 'No Changes', 'You did not make any changes to the post.', 'info' );
      }
    } catch ( error ) {
      console.error( "Update failed:", error );
      Swal.fire( 'Error!', 'Failed to update the post.', 'error' );
    } finally {
      setIsSubmitting( false );
    }
  };

  if ( loading || authLoading ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if ( !post ) {
    return <div className="text-center py-20 font-bold text-2xl">Could not load post data.</div>
  }

  return (
    <div className="bg-base-200 py-10 px-4 pt-24">
      <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Update Your Volunteer Post</h2>
        <form onSubmit={ handleUpdatePost } className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text">Thumbnail URL</span></label>
              <input type="text" name="thumbnail" defaultValue={ post?.thumbnail } required className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Post Title</span></label>
              <input type="text" name="postTitle" defaultValue={ post?.postTitle } required className="input input-bordered w-full" />
            </div>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea name="description" defaultValue={ post?.description } required className="textarea textarea-bordered w-full h-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text">Category</span></label>
              <select name="category" defaultValue={ post?.category } required className="select select-bordered w-full">
                <option>Healthcare</option>
                <option>Education</option>
                <option>Social Service</option>
                <option>Animal Welfare</option>
                <option>Environment</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <input type="text" name="location" defaultValue={ post?.location } required className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">No. of Volunteers Needed</span></label>
              <input type="number" name="volunteersNeeded" defaultValue={ post?.volunteersNeeded } required className="input input-bordered w-full" min="0" />
            </div>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Deadline</span></label>
            <DatePicker
              selected={ deadline }
              onChange={ ( date ) => setDeadline( date ) }
              dateFormat="dd/MM/yyyy"
              className="input input-bordered w-full"
              minDate={ new Date() }
            />
          </div>
          <div className="form-control mt-8">
            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={ isSubmitting }>
              { isSubmitting ? 'Updating...' : 'Update Post' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;