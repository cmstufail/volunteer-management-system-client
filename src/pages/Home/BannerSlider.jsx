import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

// components
import slidesData from '../Home/data/sliderData.json';
import './data/BannerSlider.css';


const BannerSlider = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: -30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            }
        }
    };

    return (
        <div className='full-width-banner h-[60vh] md:h-[80vh] lg:h-[85vh] max-h-[700px] mt-24 rounded-lg'>
            <div className="w-full">
                <h2 className="text-3xl md:text-4xl my-4 mb-12 font-bold text-center">
                    Featured{ " " }
                    <motion.span
                        animate={ {
                            color: [ '#ff5733', '#ffaf33', '#335cff', '#ff5733' ],
                        } }
                        transition={ { duration: 4, repeat: Infinity, ease: "linear" } }
                    >Volunteer
                    </motion.span>{ " " }
                    Opportunities
                </h2>
            </div>

            <div className="w-full h-[300px] md:h-[550px] lg:h-[450px]">
                <Swiper
                    spaceBetween={ 30 }
                    centeredSlides={ true }
                    autoplay={ { delay: 5000, disableOnInteraction: false } }
                    pagination={ { clickable: true } }
                    navigation={ true }
                    modules={ [ Autoplay, Pagination, Navigation ] }
                    className="w-full h-full "
                >
                    { slidesData.map( ( slide ) => (
                        <SwiperSlide key={ slide.id }>
                            <div className="slide-container rounded-lg overflow-hidden">
                                <img src={ slide.image } alt={ slide.heading } className="slide-image" />
                                <div className="slide-overlay"></div>

                                <motion.div
                                    className="slide-content"
                                    variants={ containerVariants }
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={ { once: false, amount: 0.3 } }
                                >
                                    <motion.h1 variants={ itemVariants } className="slide-heading">
                                        { slide.heading }
                                    </motion.h1>

                                    <motion.p variants={ itemVariants } className="slide-paragraph">
                                        { slide.paragraph }
                                    </motion.p>

                                    <motion.div variants={ itemVariants }>
                                        <Link
                                            to={ slide.buttonLink }
                                            className={ `slide-button ${ slide.buttonColor }` }
                                        >
                                            { slide.buttonText }
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ) ) }
                </Swiper>
            </div>
        </div>
    );
};

export default BannerSlider;