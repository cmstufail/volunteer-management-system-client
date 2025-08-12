import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// components
import { useTheme } from '../../context/ThemeProvider';

const testimonials = [
    { name: 'Alice Johnson', role: 'Volunteer', quote: 'This platform made it so easy to find meaningful volunteer work. I contributed to a local food drive and it was an incredibly rewarding experience!', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'John Doe', role: 'Organizer', quote: 'We found amazing and dedicated volunteers for our tree plantation event within days. The process was smooth and efficient.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Maria Garcia', role: 'Volunteer', quote: 'A great way to connect with your community and give back. I highly recommend it to anyone looking to make a difference.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const Testimonials = () => {

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="bg-base-200 dark:bg-gray-800 my-24 py-12 rounded-2xl">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Words From Our Community</h2>
                <Swiper
                    modules={ [ Pagination, Autoplay ] }
                    spaceBetween={ 30 }
                    slidesPerView={ 1 }
                    pagination={ { clickable: true } }
                    autoplay={ { delay: 5000 } }
                    className="testimonial-swiper"
                >
                    { testimonials.map( ( testimonial, index ) => (
                        <SwiperSlide key={ index } className="text-center px-4 pb-12">
                            <div className="max-w-3xl mx-auto">
                                <p className={ `text-lg md:text-xl italic ${ isDark ? 'text-white' : 'text-gray-800' }` }>"{ testimonial.quote }"</p>
                                <div className="mt-6 flex items-center justify-center gap-4">
                                    <img src={ testimonial.avatar } alt={ testimonial.name } className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-lg pb-1">
                                            { testimonial.name }
                                        </h4>
                                        <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm flex` }>
                                            { testimonial.role }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ) ) }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;

