// app/admin/layout.tsx
import AdminHeader from './AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="admin-container bg-gray-50 min-h-screen">
            <AdminHeader />
            <main>{children}</main>
        </section>
    );
}