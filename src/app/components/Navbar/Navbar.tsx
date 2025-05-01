import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch('/api/users/auth/logout', {
            method: 'POST'
        })

        router.push('/');
        router.refresh();
    }
    
    return (
        <nav className="flex sticky font-[500] text-white w-full px-6 py-4 top-0 justify-between items-center rounded-2xl">
            <Link href="/recommend">
                <button className="hover:scale-95 transition"><p className="text-2xl">Pathfinder</p></button>
            </Link>

            <div className="text-lg space-x-4">
                <Link href="/profile"><button className={pathname === "/profile" ? "underline hover:scale-95 transition" : "hover:scale-95 transition"}><p>Profile</p></button></Link>
                <button className="hover:scale-95 transition" onClick={handleLogout}><p>Sign out</p></button>
            </div>
        </nav>
    )
}