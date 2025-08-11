import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

import useTitle from './shared/hooks/UseTitle';

const ContactUs = () => {

    useTitle( 'Contact Us' );

    const [ formData, setFormData ] = useState( {
        name: '',
        email: '',
        message: ''
    } );
    const [ isSubmitting, setIsSubmitting ] = useState( false );

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( prev => ( { ...prev, [ name ]: value } ) );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !formData.name || !formData.email || !formData.message ) {
            Swal.fire( {
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill out all fields before sending.',
            } );
            return;
        }

        setIsSubmitting( true );

        try {
            const response = await axios.post( `${ import.meta.env.VITE_API_URL }/contact-message`, formData );

            if ( response.data.success ) {
                Swal.fire( {
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for contacting us. We will get back to you shortly.',
                    showConfirmButton: false,
                    timer: 2000
                } );

                setFormData( { name: '', email: '', message: '' } );
            } else {
                throw new Error( 'Something went wrong on the server.' );
            }

        } catch ( error ) {
            console.error( 'Form submission failed:', error );
            Swal.fire( {
                icon: 'error',
                title: 'Submission Failed',
                text: error.message || 'Please try again later.',
            } );
        } finally {
            setIsSubmitting( false );
        }
    };

    return (
        <div className="bg-base-200 dark:bg-gray-800 py-16 px-4 pt-24">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold">Get In Touch</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">We'd love to hear from you. Please don't hesitate to reach out.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */ }
                    <div className="bg-base-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={ handleSubmit } className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Your Name</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="input input-bordered w-full"
                                    value={ formData.name }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Your Email</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    className="input input-bordered w-full"
                                    value={ formData.email }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Message</span></label>
                                <textarea
                                    name="message"
                                    className="textarea textarea-bordered h-32 ml-2"
                                    placeholder="Your message..."
                                    value={ formData.message }
                                    onChange={ handleChange }
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={ isSubmitting }
                            >
                                { isSubmitting ? <span className="loading loading-spinner"></span> : 'Send' }
                            </button>
                        </form>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-6 bg-base-100 dark:bg-gray-900 rounded-lg shadow">
                            <FaMapMarkerAlt className="text-2xl text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Our Address</h3>
                                <p className="text-gray-600 dark:text-gray-400">123 Volunteer Street, Community City, 12345</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-base-100 dark:bg-gray-900 rounded-lg shadow">
                            <FaEnvelope className="text-2xl text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Email Us</h3>
                                <p className="text-gray-600 dark:text-gray-400">contact@volunteerhub.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-base-100 dark:bg-gray-900 rounded-lg shadow">
                            <FaPhone className="text-2xl text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Call Us</h3>
                                <p className="text-gray-600 dark:text-gray-400">+1 234 567 890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
