'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AdminHeader() {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                    NGO Admin
                </span>
                <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors bg-gray-100 px-3 py-1.5 rounded-full">
                    ← Back to Website
                </Link>
            </div>

            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
            >
                Sign Out
            </button>
        </nav>
    )
}
