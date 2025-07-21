import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(106, 56, 194, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            {/* Company Info */}
            <div className="mb-2">
                <h1 className="font-semibold text-lg text-[#6A38C2]">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">📍 India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h2 className="font-bold text-lg mb-1">{job?.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    ₹ {job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;
