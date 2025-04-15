'use client';
import { useState } from 'react';

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
        <div className="m-auto w-xl shadow-xl">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl">Register Your Account</h1>
                <div className="grid grid-cols-5">
                    <div className="flex flex-col col-span-3 space-y-4">
                        <div className="w-full">
                            <label htmlFor="email">Email Address</label>
                            <input className="block border-1 w-full" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" required/>
                        </div>
                        <div className="grid grid-cols-2 space-x-2 w-full">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input className="block border-1 w-full" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Enter Your First Name"/>
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input className="block border-1 w-full" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Enter Your Last Name"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password">Password</label>
                            <input className="block border-1 w-full" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" required/>
                        </div>
                    </div>
                    <div className="hidden md:flex border-l col-span-2">
                        <div>
                            <p>Welcome to Pathfinder</p>
                        </div>
                    </div>
                </div>
                <button className="bg-black rounded-xl mt-2" type="submit"><p className="text-white m-2">Sign Up</p></button>
            </form>
        </div>
    )
}