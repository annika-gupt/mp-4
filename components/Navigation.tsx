'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-yellow-100 p-7 text-xl">
            <div className="flex gap-4">
                <Link
                    href="/"
                    className={`hover:underline ${pathname === '/' ? 'font-bold' : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className={`hover:underline ${pathname === '/about' ? 'font-bold' : ''}`}
                >
                    About
                </Link>
            </div>
        </nav>
    );
}