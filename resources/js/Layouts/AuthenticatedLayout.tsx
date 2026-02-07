import ApplicationLogo from '@/Components/ApplicationLogo';
import { Toaster } from 'react-hot-toast';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { LayoutDashboard, Layers, Package, Bandage, ChartNoAxesCombined, ListOrdered, Phone, ImagePlus } from 'lucide-react';

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen italic" style={{ backgroundColor: 'var(--primary-color)' }}>
            <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[250px_1fr]">
                {/* ================= HEADER ================= */}
                <header className="z-30 col-span-full bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-4">
                                <Link href={route('dashboard')}>
                                    <ApplicationLogo className="h-9 w-auto fill-current text-[var(--primary-color)]" />
                                </Link>
                            </div>

                            {/* Desktop User Dropdown */}
                            <div className="hidden space-x-3 sm:flex sm:items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="inline-flex items-center rounded-md bg-[var(--primary-color)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--secondary-color)]">
                                            {user.name}
                                            <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ================= DESKTOP SIDEBAR ================= */}
                <aside className="hidden flex-col space-y-4 bg-white p-4 shadow-md md:flex">
                    <h2 className="text-lg font-semibold text-[var(--primary-color)]">Menu</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('categories.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Layers size={18} />
                                Categories
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('brands.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Bandage size={18} />
                                Brands
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('products.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Package size={18} />
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('trendings.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <ChartNoAxesCombined size={18} />
                                Trendings
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('orders.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <ListOrdered size={18} />
                                Orders
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('whatsApp.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Phone size={18} />
                                WhatsApp
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('logo.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <ImagePlus size={18} />
                                Image Add
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* ================= MOBILE SIDEBAR (SLIDE IN) ================= */}
                {/* Backdrop */}
                {showingNavigationDropdown && (
                    <div onClick={() => setShowingNavigationDropdown(false)} className="fixed inset-0 z-40 bg-black/50 md:hidden" />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 md:hidden ${showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-lg font-semibold text-[var(--primary-color)]">Menu</h2>
                        <button onClick={() => setShowingNavigationDropdown(false)} className="text-xl">
                            ✕
                        </button>
                    </div>

                    <ul className="space-y-2 p-4">
                        <li>
                            <Link
                                href={route('dashboard')}
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('categories.index')}
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Layers size={18} />
                                Categories
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('brands.index')}
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Layers size={18} />
                                Categories
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('products.index')}
                                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[var(--primary-color)] hover:text-white"
                            >
                                <Package size={18} />
                                Products
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <button onClick={() => setShowingNavigationDropdown(true)} className="rounded-md bg-[var(--primary-color)] p-2 text-white">
                        ☰
                    </button>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <main className="bg-gray-100 p-4 md:p-6">
                    {header && <h1 className="mb-4 text-center text-2xl font-semibold text-[var(--primary-color)]">{header}</h1>}
                    {children}

                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                borderRadius: '8px',
                                background: '#111827',
                                color: '#fff',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#22c55e',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </main>
            </div>
        </div>
    );
}
