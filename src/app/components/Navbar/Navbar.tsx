import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch('/api/users/auth/logout', {
            method: 'POST'
        })

        router.push('/auth/login');
        router.refresh();
    }
    
    return (
        <nav className="flex sticky font-[500] text-white w-full px-6 py-4 top-0 justify-between items-center rounded-2xl">
            <Link href="/recommend">
                <button className="text-2xl">Pathfinder</button>
            </Link>

            <div className="text-lg space-x-4">
                <Link className={pathname === "/profile" ? "underline" : ""} href="/profile">Profile</Link>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}