import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquareText } from 'lucide-react';

export default function ContactContent() {
    return (
        <div className="bg-white">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[var(--primary-color)] py-24 text-white">
                <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--secondary-color)] opacity-20 blur-3xl"></div>
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter md:text-6xl">
                        Connect <span className="text-[var(--secondary-color)]">With Us</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium text-white/80">
                        Whether it's about a delivery, a product, or just a friendly "hello," our team is ready to assist you with your grocery needs.
                    </p>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="container relative z-20 mx-auto -mt-16 px-4 pb-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* LEFT: CONTACT INFO (4 Columns) */}
                    <div className="space-y-6 lg:col-span-4">
                        <div className="h-full rounded-[2rem] border border-gray-50 bg-white p-10 shadow-2xl shadow-gray-200/50">
                            <h2 className="mb-8 text-2xl font-black uppercase italic text-[var(--primary-color)]">Information</h2>

                            <div className="space-y-8">
                                <Info icon={<Phone size={24} />} title="Direct Line" value="+880 1234 567 890" />

                                <Info icon={<Mail size={24} />} title="Email Support" value="support@freshmarket.com" />

                                <Info icon={<MapPin size={24} />} title="Main Hub" value="Gulshan-2, Dhaka, Bangladesh" />

                                <Info icon={<Clock size={24} />} title="Service Hours" value="Sat – Thu : 9:00 AM – 9:00 PM" />
                            </div>

                            {/* Social or Extra Note */}
                            <div className="mt-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Live Support</p>
                                <p className="text-sm text-gray-600">
                                    Average response time: <b>30 minutes</b>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: CONTACT FORM (8 Columns) */}
                    <div className="lg:col-span-8">
                        <div className="rounded-[2rem] border border-gray-50 bg-white p-10 shadow-2xl shadow-gray-200/50 md:p-14">
                            <div className="mb-8 flex items-center gap-3 text-[var(--secondary-color)]">
                                <MessageSquareText size={28} />
                                <h2 className="text-3xl font-black uppercase italic text-[var(--primary-color)]">Send a Message</h2>
                            </div>

                            <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border-transparent bg-gray-50 p-4 font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--secondary-color)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="example@mail.com"
                                        className="w-full rounded-xl border-transparent bg-gray-50 p-4 font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--secondary-color)]"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="How can we help?"
                                        className="w-full rounded-xl border-transparent bg-gray-50 p-4 font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--secondary-color)]"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">Your Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="Write your message here..."
                                        className="w-full resize-none rounded-xl border-transparent bg-gray-50 p-4 font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--secondary-color)]"
                                    ></textarea>
                                </div>

                                <div className="pt-4 md:col-span-2">
                                    <button
                                        type="submit"
                                        className="shadow-maroon-900/20 group flex w-full items-center justify-center gap-3 rounded-full bg-[var(--primary-color)] px-12 py-5 font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-105 hover:bg-[var(--secondary-color)] active:scale-95 md:w-max"
                                    >
                                        Send Message{' '}
                                        <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="container mx-auto px-4 pb-24">
                <div className="overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-2xl shadow-gray-200/50">
                    <div className="h-[400px] overflow-hidden rounded-[2rem] grayscale transition-all duration-700 hover:grayscale-0">
                        <iframe
                            title="Store Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700312061486!2d90.412518!3d23.793993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c364531ac31f2c!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625562000000!5m2!1sen!2sbd"
                            className="h-full w-full border-0"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Info({ icon, title, value }) {
    return (
        <div className="group flex items-start gap-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-[var(--secondary-color)] transition-all duration-300 group-hover:bg-[var(--primary-color)] group-hover:text-white">
                {icon}
            </div>
            <div>
                <h4 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{title}</h4>
                <p className="font-bold leading-tight text-[var(--text-black)]">{value}</p>
            </div>
        </div>
    );
}