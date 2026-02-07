import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import localLogo from '../../../public/images/logo.png';

export default function Footer() {
    const menuRoutes = {
        Home: route('home'),
        Shop: route('shop.index'),
        About: route('about'),
        Contacts: route('contact'),
        Checkout: route('checkout'),
    };

    const { logo } = usePage();

    const groceryCategories = ['Organic Fruits', 'Fresh Vegetables', 'Dairy & Eggs', 'Meat & Seafood', 'Spices & Oils', 'Daily Essentials'];

    return (
        <footer className="border-t border-gray-100 bg-white pb-10 pt-20">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Column (4 Cols) */}
                    <div className="space-y-6 lg:col-span-4">
                        <img src={logo ? logo.image_url : localLogo} alt="Logo" className="h-12" />
                        <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                            Bringing the farm to your doorstep. We specialize in providing the freshest, highest-quality organic groceries for a
                            healthier lifestyle.
                        </p>
                        <div className="flex gap-4">
                            <SocialCircle icon={<Facebook size={18} />} />
                            <SocialCircle icon={<Instagram size={18} />} />
                            <SocialCircle icon={<Twitter size={18} />} />
                        </div>
                    </div>

                    {/* Quick Links (2 Cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[var(--primary-color)]">Menu</h3>
                        <ul className="space-y-4">
                            {Object.keys(menuRoutes).map((item) => (
                                <li key={item}>
                                    <Link
                                        href={menuRoutes[item]}
                                        className="group relative text-sm font-bold text-gray-600 transition-all hover:text-[var(--secondary-color)]"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--secondary-color)] transition-all group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop Categories (3 Cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[var(--primary-color)]">Fresh Shop</h3>
                        <ul className="grid grid-cols-1 gap-4">
                            {groceryCategories.map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href={route('shop.index', { category: cat.toLowerCase() })}
                                        className="flex items-center gap-2 text-sm font-bold text-gray-600 transition-all hover:text-[var(--secondary-color)]"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-[var(--secondary-color)]"></span>
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details (3 Cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[var(--primary-color)]">Contact Us</h3>
                        <div className="space-y-4">
                            <ContactItem icon={<Phone size={16} />} text="+880 123 45 67 890" />
                            <ContactItem icon={<Mail size={16} />} text="support@freshmarket.com" />
                            <ContactItem icon={<MapPin size={16} />} text="Gulshan-2, Dhaka, Bangladesh" />
                        </div>

                        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[var(--secondary-color)]">Store Hours</p>
                            <p className="text-xs font-bold text-gray-600">Sat – Thu : 9 AM – 9 PM</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-gray-50 pt-8 md:flex-row">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        © 2026 FreshMarket. Developed for Organic Excellence.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--primary-color)]">
                            Privacy Policy
                        </Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--primary-color)]">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialCircle({ icon }) {
    return (
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 text-[var(--primary-color)] shadow-sm transition-all hover:bg-[var(--primary-color)] hover:text-white">
            {icon}
        </div>
    );
}

function ContactItem({ icon, text }) {
    return (
        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <div className="text-[var(--secondary-color)]">{icon}</div>
            {text}
        </div>
    );
}
