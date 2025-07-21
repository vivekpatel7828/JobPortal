import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import  {motion}  from 'framer-motion';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const navItemVariants = {
        hover: { scale: 1.05, color: "#6A38C2" },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className='bg-white backdrop-blur-md sticky top-0 z-50 shadow-sm'
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <motion.h1
                    className='text-2xl font-bold cursor-pointer'
                    whileHover={{ scale: 1.05 }}
                >
                    Job<span className='text-[#F83002]'>Portal</span>
                </motion.h1>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                                        <Link to="/admin/companies">Companies</Link>
                                    </motion.li>
                                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                                        <Link to="/admin/jobs">Jobs</Link>
                                    </motion.li>
                                </>
                            ) : (
                                <>
                                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                                        <Link to="/">Home</Link>
                                    </motion.li>
                                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                                        <Link to="/jobs">Jobs</Link>
                                    </motion.li>
                                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                                        <Link to="/browse">Browse</Link>
                                    </motion.li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/signup"><Button className="bg-[#6A38c2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
                                </motion.div>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2  transition-transform hover:scale-105">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl">
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className='flex gap-4 mb-4'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                                <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-lg'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2 text-gray-700'>
                                            {user?.role === 'student' && (
                                                <motion.div
                                                    className='flex items-center gap-2'
                                                    whileHover={{ scale: 1.03 }}
                                                >
                                                    <User2 />
                                                    <Button variant="link" className="p-0 text-base font-medium">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </motion.div>
                                            )}

                                            <motion.div
                                                className='flex items-center gap-2'
                                                whileHover={{ scale: 1.03 }}
                                            >
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className="p-0 text-base font-medium text-red-500">
                                                    Logout
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
