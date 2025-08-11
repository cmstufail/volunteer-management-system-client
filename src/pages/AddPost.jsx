import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useTitle from '../pages/shared/hooks/UseTitle';
import useAxiosSecure from '../pages/shared/hooks/useAxiosSecure';


const AddPost = () => {

  useTitle( 'Add Post' );

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [ deadline, setDeadline ] = useState( new Date() );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt( form.volunteersNeeded.value ),
      deadline: deadline,
      organizer: {
        name: user.displayName,
        email: user.email,
      },
      createdAt: new Date(),
    };

    try {
      const { data } = await axiosSecure.post( '/posts', newPost );

      if ( data.insertedId ) {
        Swal.fire( {
          icon: 'success',
          title: 'Post Added Successfully!',
          showConfirmButton: false,
          timer: 1500
        } );
        navigate( '/manage-posts' );
      }
    } catch ( error ) {
      console.error( 'Failed to submit post:', error );
      Swal.fire( {
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Something went wrong!',
      } );
    }
  };

  return (
    <div className="bg-base-200 dark:bg-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-xl rounded-lg my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Add a New Volunteer Need Post</h2>

        {/* form */ }
        <form onSubmit={ handleSubmit } className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text">Thumbnail URL</span></label>
              <input type="text" name="thumbnail" placeholder="Enter image URL" required className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Post Title</span></label>
              <input type="text" name="postTitle" placeholder="Enter post title" required className="input input-bordered w-full" />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea name="description" placeholder="Write a detailed description" required className="textarea textarea-bordered w-full h-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text">Category</span></label>
              <select name="category" required className="select select-bordered w-full">
                <option disabled value="">Select a category</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Social Service</option>
                <option>Animal Welfare</option>
                <option>Environment</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <input type="text" name="location" placeholder="e.g., Dhaka, Bangladesh" required className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">No. of Volunteers Needed</span></label>
              <input type="number" name="volunteersNeeded" placeholder="e.g., 10" required className="input input-bordered w-full" min="1" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-gray-700">
            <div className="form-control">
              <label className="label"><span className="label-text">Organizer Name</span></label>
              <input type="text" defaultValue={ user?.displayName } readOnly disabled className="input input-bordered w-full bg-base-200 dark:bg-gray-700" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Organizer Email</span></label>
              <input type="email" defaultValue={ user?.email } readOnly disabled className="input input-bordered w-full bg-base-200 dark:bg-gray-700" />
            </div>
          </div>

          <div className="form-control mt-8">
            <button type="submit" className="btn btn-primary btn-lg w-full">Add Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
