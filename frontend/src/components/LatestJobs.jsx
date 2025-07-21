import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <motion.div
            className='max-w-7xl mx-auto my-20 px-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1
                className='text-4xl font-bold text-center md:text-left'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </motion.h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8'>
                {
                    allJobs.length <= 0 ? (
                        <motion.span
                            className="col-span-full text-center text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            🚫 No Job Available
                        </motion.span>
                    ) : (
                        allJobs.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )
                }
            </div>
        </motion.div>
    )
}

export default LatestJobs;






