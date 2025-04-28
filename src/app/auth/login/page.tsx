'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fadeIn } from '@/lib/animation';
import FramedScreen from '@/components/FramedScreen/FramedScreen';
import PageTransitionEffect from '@/components/PageTransitionEffect/PageTransitionEffect';

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
        <PageTransitionEffect animation={fadeIn}>
            <FramedScreen>
                <div className="bg-white m-auto w-fit rounded-2xl">
                    <form className="p-12" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-5">
                            <div className="flex flex-col col-span-3 pr-8">
                                <p className="text-4xl mb-8">Login</p>
                                <div className="mb-4 w-full">
                                    <label htmlFor="email"><p className="text-xl">Email Address</p></label>
                                    <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="email" type="text" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address"/>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="password"><p className="text-xl">Password</p></label>
                                    <input className="block border-1 border-gray-400 p-2 w-full rounded-md" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password"/>
                                </div>
                                <button className="bg-black mt-4 rounded-xl" type="submit"><p className="text-white p-2">Login</p></button>
                            </div>

                            <div className="hidden md:flex col-span-2 border-l pl-4 self-stretch">
                                <div className="text-4xl m-auto space-y-2 justify-left items-center">
                                    <p>Welcome</p> 
                                    <p>to</p>
                                    <p>Pathfinder</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </FramedScreen>
        </PageTransitionEffect>
    )
}