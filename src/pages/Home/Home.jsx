import { useEffect, useState } from 'react';
import Container from '../shared/Container';
import useTitle from '../shared/hooks/UseTitle';
import BannerSlider from './BannerSlider';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import VolunteerNeedsNow from './VolunteerNeedsNow';
import LoadingSpinner from '../shared/LoadingSpinner';
// import AboutUs from '../AboutUs';
// import ContactUs from '../ContactUs';
import AboutUsPreview from './AboutUsPreview';
import ContactUsPreview from './ContactUsPreview';


const Home = () => {

    useTitle( 'Home' );

    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const timer = setTimeout( () => {
            setLoading( false );
        }, 1500 );
        return () => clearTimeout( timer );
    }, [] );

    if ( loading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <Container>
            <BannerSlider />
            <VolunteerNeedsNow />
            <HowItWorks />
            <Testimonials />
            {/* <AboutUs/> */}
            {/* <ContactUs/> */}
            <AboutUsPreview/>
            <ContactUsPreview/>
        </Container>
    );
};

export default Home;