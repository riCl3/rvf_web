// app/admin/layout.tsx
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="admin-container bg-gray-100 min-h-screen">
            {/* You can add a side-bar or admin-only nav here later */}
            <nav className="p-4 bg-blue-800 text-white font-bold">
                NGO Admin Panel
            </nav>
            <main>{children}</main>
        </section>
    );
}