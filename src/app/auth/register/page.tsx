'use client';
import { useState } from 'react';
import PageTransitionEffect from '@/components/PageTransitionEffect/PageTransitionEffect';
import FramedScreen from '@/components/FramedScreen/FramedScreen';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/users/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (res.ok) {
            console.log('Signup successful!');
        } else {
            console.log(`Signup failed: ${result.error}`)
        }
    }

    return (
        <PageTransitionEffect>
            <FramedScreen>
                <div className="bg-white m-auto w-fit rounded-2xl">
                    <button className="relative text-gray-600 hover:text-black my-4 ml-4 p-2 text-lg" onClick={() => window.history.back()}>← Back</button>
                    <form className="px-12 pb-12" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <p className="text-4xl mb-8">Register Your Account</p>
                            <div className="mb-4 w-full">
                                <label htmlFor="email"><p className="text-xl">Email Address</p></label>
                                <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 space-x-4">
                                <div>
                                    <label htmlFor="firstName"><p className="text-xl">First Name</p></label>
                                    <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Enter Your First Name" />
                                </div>
                                <div>
                                    <label htmlFor="lastName"><p className="text-xl">Last Name</p></label>
                                    <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Enter Your Last Name" />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="password"><p className="text-xl">Password</p></label>
                                <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" required />
                            </div>
                            <button className="bg-black rounded-xl mt-4" type="submit"><p className="text-white m-2">Sign Up</p></button>
                        </div>
                    </form>
                </div>
            </FramedScreen>
        </PageTransitionEffect>
    )
}