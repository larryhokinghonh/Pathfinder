'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/users/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (res.ok) {
            console.log('Login successful!');
            router.push('/recommend')
        } else {
            console.log(`Login failed: ${result.error}`)
        }
    }

    return (
        <div className="m-auto w-xl shadow-xl">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl">Login</h1>
                <div className="grid grid-cols-5">
                    <div className="flex flex-col col-span-3 space-y-4">
                        <div className="w-full">
                            <label htmlFor="email">Email Address</label>
                            <input className="block border-1 w-full" name="email" type="text" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password">Password</label>
                            <input className="block border-1 w-full" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password"/>
                        </div>
                    </div>
                    <div className="hidden md:flex border-l col-span-2">
                        <div>
                            <p>Welcome to Pathfinder</p>
                        </div>
                    </div>
                </div>
                <button className="bg-black rounded-xl mt-2" type="submit"><p className="text-white m-2">Login</p></button>
            </form>
        </div>
    )
}