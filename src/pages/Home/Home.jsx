import Container from '../shared/Container';
import useTitle from '../shared/hooks/UseTitle';
import BannerSlider from './BannerSlider';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import VolunteerNeedsNow from './VolunteerNeedsNow';


const Home = () => {

    useTitle( 'Home' );

    return (
        <Container>
            <BannerSlider />
            <VolunteerNeedsNow />
            <HowItWorks />
            <Testimonials />
        </Container>
    );
};

export default Home;