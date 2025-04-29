'use client'
import Link from 'next/link';
import FramedScreen from '@/components/FramedScreen/FramedScreen';
import PageTransitionEffect from '@/components/PageTransitionEffect/PageTransitionEffect';
import HomepageBackground from '@/components/HomepageBackground/HomepageBackground';

export default function AboutPage() {
	return (
		<PageTransitionEffect>
			<FramedScreen>
				{/* Establish local positioning context */}
				<div className="relative flex w-full h-full text-center">
					{/* Makes the layer to be independent from other layers */}
					<div className="absolute inset-0 z-0">
						<HomepageBackground speed={0.5} squareSize={60} direction='diagonal' borderColor='#6A7282' hoverFillColor='#4A5565'/>
					</div>

					<div className="relative m-auto w-fit space-y-8 z-10">
						<div className="space-y-10">
							<p className="text-white text-9xl font-[600] tracking-widest">Pathfinder</p>
							<p className="text-white text-2xl font-[400]">Find Your Ideal Career and Academic Path.</p>
						</div>

						<div className="flex flex-col m-auto items-center">
							<Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl hover:translate-y-0.5 transition" href="/auth/login"><button className=""><p className="text-white">Log In</p></button></Link>
							<Link className="bg-black shadow-lg shadow-white w-full m-6 p-4 border-3 border-white rounded-2xl hover:translate-y-0.5 transition" href="/auth/register"><button className=""><p className="text-white">Sign Up</p></button></Link>
						</div>
					</div>
				</div>
			</FramedScreen>
		</PageTransitionEffect>
	);
}