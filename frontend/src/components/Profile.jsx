import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="flex justify-between items-start">
          {/* Avatar & Info */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-sm text-gray-500 mt-1">{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          {/* Edit Button */}
          <Button onClick={() => setOpen(true)} variant="outline" className="rounded-full shadow-sm">
            <Pen className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 text-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="text-gray-500" />
            <span className="text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-sm">{user?.phoneNumber || 'N/A'}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-md font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} className="text-base px-3 py-1 bg-purple-100 text-purple-700 font-medium rounded-full">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">Not Provided</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-8">
          <Label className="text-md font-semibold block mb-1">Resume</Label>
          {isResume && user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline break-all"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm text-gray-500">Resume not uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Edit Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
