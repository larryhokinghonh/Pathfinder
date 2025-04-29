'use client'
import Link from 'next/link';
import FramedScreen from '@/components/FramedScreen/FramedScreen';
import PageTransitionEffect from '@/components/PageTransitionEffect/PageTransitionEffect';

export default function AboutPage() {
    return (
        <PageTransitionEffect>
            <FramedScreen>
                <div className="m-auto w-fit space-y-8 text-center">
                    <div className="space-y-10">
                        <p className="text-white text-9xl font-[600] tracking-widest">Pathfinder</p>
                        <p className="text-white text-2xl font-[400]">Find Your Ideal Career and Academic Path.</p>
                    </div>

                    <div className="flex flex-col m-auto items-center">
                        <Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl hover:translate-y-0.5 transition" href="/auth/login"><button className=""><p className="text-white">Log In</p></button></Link>
                        <Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl hover:translate-y-0.5 transition" href="/auth/register"><button className=""><p className="text-white">Sign Up</p></button></Link>
                    </div>
                </div>
            </FramedScreen>
        </PageTransitionEffect>
    );
}