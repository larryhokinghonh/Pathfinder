import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Make navbar transparent by setting navbar Z index to make it appear above everything else

export default function Navbar() {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    }

    const handleLogout = async () => {
        await fetch('/api/users/auth/logout', {
            method: 'POST'
        })

        router.push('/auth/login');
        router.refresh();
    }
    
    return (
        <nav className="flex font-[500] bg-blue-400 shadow-xl px-6 py-4 justify-between items-center">
            <button onClick={handleLogoClick} className="text-2xl">
                Pathfinder
            </button>
            <div className="text-lg space-x-4">
                <Link href="#">Profile</Link>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}