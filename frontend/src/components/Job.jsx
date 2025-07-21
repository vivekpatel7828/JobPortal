import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Posted Today'
            : `${daysAgoFunction(job?.createdAt)} day(s) ago`}
        </span>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Save Job">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-12 h-12 border">
          <AvatarImage
            src={job?.company?.logo || '/placeholder-logo.png'}
            alt={job?.company?.name || 'Company Logo'}
          />
        </Avatar>
        <div>
          <h2 className="font-semibold text-md">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">{job?.location || 'India'}</p>
        </div>
      </div>

      {/* Job Title + Description */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description || 'No description provided.'}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-medium">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge variant="ghost" className="text-red-600 font-medium">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-purple-700 font-medium">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full hover:border-purple-700 hover:text-purple-700"
        >
          View Details
        </Button>
        {/* <Button className="bg-purple-700 hover:bg-purple-800 text-white w-full">
          Save Job
        </Button> */}
      </div>
    </div>
  );
};

export default Job;
