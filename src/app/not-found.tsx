import Link from 'next/link';
import PageTransitionEffect from "./components/PageTransitionEffect/PageTransitionEffect"
import FramedScreen from "./components/FramedScreen/FramedScreen"

export default function NotFound() {
    return (
        <PageTransitionEffect>
            <FramedScreen>
                <div className="flex flex-col text-white m-auto space-y-8 justify-center items-center">
                    <p className="text-8xl tracking-widest">404 Not Found</p>
                    <p className="text-2xl">We could not find what you are looking for.</p>
                    <Link href="/"><button className="bg-white w-full rounded-2xl hover:scale-95 transition"><p className="text-black text-lg p-4">Back to Home</p></button></Link>
                </div>
            </FramedScreen>
        </PageTransitionEffect>
    )
}