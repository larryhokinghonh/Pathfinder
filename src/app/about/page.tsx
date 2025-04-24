'use client'
import Link from 'next/link';
import FramedScreen from '@/components/FramedScreen/FramedScreen';

export default function AboutPage() {
    return (
        <FramedScreen>
            <div className="m-auto w-fit space-y-8 text-center">
                <div className="space-y-10">
                    <p className="text-white text-4xl font-[600] tracking-widest">Pathfinder</p>
                    <p className="text-white text-2xl font-[400]">Find Your Ideal Career and Academic Path.</p>
                </div>

                <div className="flex flex-col m-auto items-center">
                    <Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl" href="/auth/login"><button className="text-white">Log In</button></Link>
                    <Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl" href="/auth/register"><button className="text-white">Sign Up</button></Link>
                </div>
            </div>
        </FramedScreen>
    );
}