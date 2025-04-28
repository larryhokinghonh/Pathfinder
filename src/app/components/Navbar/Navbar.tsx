import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/recommend');
    }

    const handleLogout = async () => {
        await fetch('/api/users/auth/logout', {
            method: 'POST'
        })

        router.push('/auth/login');
        router.refresh();
    }
    
    return (
        <nav className="flex sticky font-[500] text-white w-full px-6 py-4 top-0 justify-between items-center rounded-2xl">
            <button onClick={handleLogoClick} className="text-2xl">
                Pathfinder
            </button>
            <div className="text-lg space-x-4">
                <Link href="/profile">Profile</Link>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}