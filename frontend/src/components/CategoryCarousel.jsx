import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div
            className='my-20'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem
                                className="md:basis-1/2 lg:basis-1/3 px-2"
                                key={index}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Button
                                        onClick={() => searchJobHandler(cat)}
                                        variant="outline"
                                        className="rounded-full w-full py-6 text-sm font-medium border-gray-300 hover:shadow-md hover:border-[#6A38C2] transition"
                                    >
                                        {cat}
                                    </Button>
                                </motion.div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hover:scale-105 transition-transform" />
                <CarouselNext className="hover:scale-105 transition-transform" />
            </Carousel>
        </motion.div>
    );
};

export default CategoryCarousel;
