import { useCart } from '@/context/CartContext';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, LogOut, Menu, Package, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../public/images/logo.png';

export default function Header() {
    const { products, categories, auth } = usePage().props;
    const [showCategory, setShowCategory] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const { cart, openCart, setOpenCart, removeFromCart } = useCart();

    const [filteredProduct, setFilteredProduct] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchProduct(query);
        if (query.trim() === '') {
            setFilteredProduct([]);
            setShowSearch(false);
        } else {
            setShowSearch(true);
            const filtered = products.filter((item) => item.name.toLowerCase().includes(query));
            setFilteredProduct(filtered);
        }
    };

    const menuRoutes: Record<string, string> = {
        Home: route('home'),
        Shop: route('shop.index'),
        About: route('about'),
        Contacts: route('contact'),
    };

    return (
        <header className="sticky top-0 z-[100] w-full shadow-sm">
            {/* Top Bar: Brand & Desktop Nav */}
            <div className="border-b border-gray-100 bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-0">
                    {/* Logo */}
                    <Link href={route('home')} className="transition-transform hover:scale-105">
                        <img src={logo} alt="FreshMarket Logo" className="h-10 w-auto object-contain md:h-12" />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-x-10 text-sm font-black uppercase tracking-[0.2em]">
                            {Object.keys(menuRoutes).map((item) => (
                                <li key={item}>
                                    <Link
                                        href={menuRoutes[item]}
                                        className="group relative text-[var(--primary-color)] transition-colors hover:text-[var(--secondary-color)]"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--secondary-color)] transition-all group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Toggles */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="p-2 text-[var(--primary-color)]">
                            <Search size={22} />
                        </button>
                        <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 text-[var(--primary-color)]">
                            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-x-0 top-[88px] z-[90] border-b bg-white shadow-2xl transition-all duration-300 ease-in-out md:hidden ${
                        mobileMenu ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-5 opacity-0'
                    }`}
                >
                    <div className="max-h-[80vh] space-y-6 overflow-y-auto p-6">
                        {/* Main Links */}
                        <ul className="flex flex-col gap-y-4">
                            {Object.keys(menuRoutes).map((item) => (
                                <li key={item}>
                                    <Link
                                        href={menuRoutes[item]}
                                        className="flex items-center justify-between text-lg font-black uppercase italic tracking-tighter text-[var(--primary-color)]"
                                        onClick={() => setMobileMenu(false)} // Close menu on click
                                    >
                                        {item}
                                        <ChevronDown size={16} className="-rotate-90 text-[var(--secondary-color)]" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <hr className="border-gray-100" />

                        {/* Mobile Categories Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Shop By Category</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={route('shop.index')}
                                        onClick={() => setMobileMenu(false)}
                                        className="rounded-xl bg-gray-50 p-3 text-sm font-bold text-gray-700 transition-colors active:bg-[var(--secondary-color)] active:text-white"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Bar: Search & Actions */}
            <div className="bg-[var(--primary-color)] py-3">
                <div className="container mx-auto flex items-center justify-between gap-6 px-4 lg:px-0">
                    {/* Category Dropdown */}
                    <div className="relative hidden w-1/4 lg:block">
                        <button
                            onClick={() => setShowCategory(!showCategory)}
                            className="group flex items-center gap-3 py-2 font-bold tracking-tight text-white"
                        >
                            <div className="rounded-lg bg-white/10 p-2 transition-colors group-hover:bg-[var(--secondary-color)]">
                                <Menu size={18} />
                            </div>
                            <span className="text-sm uppercase tracking-widest">Shop Categories</span>
                            <ChevronDown className={`transition-transform duration-300 ${showCategory ? 'rotate-180' : ''}`} size={16} />
                        </button>

                        {showCategory && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowCategory(false)}></div>
                                <div className="animate-in fade-in slide-in-from-top-2 absolute left-0 top-full z-50 mt-4 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                                    <ul className="py-2">
                                        {categories.map((cat) => (
                                            <li key={cat.id}>
                                                <Link
                                                    href={route('shop.index')}
                                                    className="flex items-center px-6 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 hover:text-[var(--secondary-color)]"
                                                >
                                                    {cat.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Centered Search Bar */}
                    <div className="relative max-w-2xl flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search fresh groceries..."
                                value={searchProduct}
                                onChange={handleSearch}
                                className="focus:ring-[var(--secondary-color)]/20 h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 pr-12 text-white outline-none transition-all placeholder:text-white/60 focus:bg-white focus:text-black focus:ring-4"
                            />
                            <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearch && filteredProduct.length > 0 && (
                            <div className="absolute left-0 top-full z-[110] mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                                {filteredProduct.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('cart.show', item)}
                                        className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                                        onClick={() => setShowSearch(false)}
                                    >
                                        <img src={item.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                            <p className="text-xs font-black italic text-[var(--secondary-color)]">৳{item.price}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User & Cart Actions */}
                    <div className="flex w-1/4 items-center justify-end gap-6">
                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 py-2 text-white transition-colors hover:text-[var(--secondary-color)]"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                                    <User size={20} />
                                </div>
                                <ChevronDown size={14} className={`hidden transition-transform sm:block ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {showUserMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                                    <div className="absolute right-0 top-full z-50 mt-4 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                                        {auth.user ? (
                                            <div className="space-y-1">
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
                                                >
                                                    <User size={16} className="text-[var(--secondary-color)]" /> Profile
                                                </Link>
                                                <Link
                                                    href={route('user.order')}
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
                                                >
                                                    <Package size={16} className="text-[var(--secondary-color)]" /> My Orders
                                                </Link>
                                                <button
                                                    onClick={() => router.post(route('logout'))}
                                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <Link
                                                    href={route('login')}
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="block w-full rounded-xl bg-[var(--primary-color)] py-3 text-center text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--secondary-color)]"
                                                >
                                                    Sign Up
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Cart Trigger */}
                        <button
                            onClick={() => setOpenCart(true)}
                            className="group relative p-2 text-white transition-colors hover:text-[var(--secondary-color)]"
                        >
                            <ShoppingBag size={26} className="transition-transform group-hover:scale-110" />
                            {cart.length > 0 && (
                                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--primary-color)] bg-[var(--secondary-color)] text-[10px] font-black text-white">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart Drawer */}
            <div
                className={`fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${openCart ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setOpenCart(false)}
            />
            <div
                className={`fixed right-0 top-0 z-[201] flex h-full w-full transform flex-col bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out sm:w-[400px] ${openCart ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between border-b bg-gray-50/50 p-6">
                    <div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-[var(--primary-color)]">Your Basket</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cart.length} items</p>
                    </div>
                    <button onClick={() => setOpenCart(false)} className="rounded-full p-2 transition-colors hover:bg-gray-200">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center italic opacity-40">
                            <ShoppingBag size={64} className="mb-4" />
                            <p>Your basket is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="group flex gap-4">
                                <img
                                    src={item.image}
                                    className="h-20 w-20 rounded-2xl object-cover shadow-md transition-transform group-hover:scale-105"
                                    alt=""
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-black uppercase leading-tight tracking-tight text-gray-800">{item.name}</h4>
                                    <p className="mt-1 text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                                    <p className="mt-1 font-black italic text-[var(--secondary-color)]">৳{item.totalPrice}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 transition-colors hover:text-red-500">
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="space-y-4 border-t bg-white p-6">
                    <div className="flex items-end justify-between">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Total Amount</span>
                        <span className="text-2xl font-black italic text-[var(--primary-color)]">
                            ৳{cart.reduce((s, i) => s + Number(i.totalPrice), 0)}
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            setOpenCart(false);
                            router.visit(route('checkout'));
                        }}
                        className="shadow-maroon-900/20 w-full rounded-2xl bg-[var(--primary-color)] py-5 font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[var(--secondary-color)] active:scale-95"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </header>
    );
}
