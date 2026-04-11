import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/app-layout/Sidebar';
import AppHeader from '@/components/app-layout/AppHeader';
import FinancialDrawer from '@/components/Accounting/FinancialDrawer';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-body)' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <AppHeader />
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
            <FinancialDrawer />
        </div>
    );
};

export default AdminLayout;
