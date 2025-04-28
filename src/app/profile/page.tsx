'use client';
import PageTransitionEffect from "@/components/PageTransitionEffect/PageTransitionEffect";
import FramedScreen from "@/components/FramedScreen/FramedScreen";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: ''
    });

    useEffect(() => {
        async function fetchProfileData() {
            try {
                const res = await fetch('/api/users/profile');

                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        bio: data.bio
                    });
                }
            } catch (err) {
                console.error('Failed to fetch profile data: ', err);
            } finally {
                setLoading(false);
            }

        }
        fetchProfileData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/users/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (res.ok) {
            // Modal to tell user that the update is successful
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 2000);
        } else {
            console.log(`Update failed: ${result.error}`);
        }
    }

    if (loading) {
        return (
            <PageTransitionEffect>
                <FramedScreen>
                    <Navbar />
                    <div className="flex justify-center items-center">
                        <p className="text-white text-2xl animate-pulse">Loading...</p>
                    </div>
                </FramedScreen>
            </PageTransitionEffect>
        )
    }
    return (
        <PageTransitionEffect>
            <FramedScreen>
                <Navbar />
                <div className="bg-white m-6 p-6 rounded-2xl">
                    <p className="mb-6 text-4xl">Your Profile</p>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="firstName"><p className="text-xl">First Name</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="firstName" type="text" value={formData.firstName} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="lastName"><p className="text-xl">Last Name</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="lastName" type="text" value={formData.lastName} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="bio"><p className="text-xl">About You</p></label>
                                <textarea className="w-full p-4 border-2 rounded-2xl custom-scrollbar" name="bio" value={formData.bio} onChange={handleChange} rows={15}></textarea>
                            </div>
                        </div>
                        <button className="bg-black rounded-2xl"><p className="text-white p-3">Save Profile</p></button>
                    </form>
                </div>

                <AnimatePresence>
                    {showSuccessModal && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-20 bg-green-600 transform -translate-x-1/2 left-1/2 px-6 py-3 rounded-2xl"
                        >
                            <p className="text-white text-lg">Profile updated successfully.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </FramedScreen>
        </PageTransitionEffect>
    )
}