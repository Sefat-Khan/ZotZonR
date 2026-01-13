import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
    const menuRoutes = {
  Home: route('home'),
  Shop: route('shop.index'),
  About: route('about'),
  Contacts: route('contact'),
  Checkout: route('checkout'),
};

  return (
    <footer className="bg-white border-t border-gray-300 px-4 md:px-16 py-8 md:py-16">
      {/* Top Footer Links */}
      <div className="flex flex-wrap gap-8 md:gap-12 justify-between">
        {/* MENU */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold text-[var(--text-black)] mb-4">MENU</h3>
          <ul className="flex flex-col gap-y-2">
            {Object.keys(menuRoutes).map((item) => (
    <li key={item}>
      <Link
        href={menuRoutes[item]}
        className="text-[var(--text-black)] font-bold hover:text-[var(--secondary-color)] transition-all"
      >
        {item}
      </Link>
    </li>
  ))}
          </ul>
        </div>

        {/* SHOP */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold text-[var(--text-black)] mb-4">SHOP</h3>
          <ul className="flex flex-col gap-y-2">
            {["Accessories", "Furniture", "Electronics", "Clothes", "Bags", "Home Appliances"].map((cat) => (
              <li key={cat} className="relative progress w-fit">
                <Link href={route('shop.index', { category: cat.toLowerCase() })} className="text-gray-600 cursor-pointer font-semibold transition-colors duration-300 hover:text-[var(--primary-color)]">
                  {cat}
                </Link>
                
                <span className="progress"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold text-[var(--text-black)] mb-4">HELP</h3>
          <ul className="flex flex-col gap-y-2">
            {["Privacy Policy", "Terms & Conditions", "Special E-shop", "Shipping", "Secure Payments"].map((item) => (
              <li key={item} className="relative progress w-fit">
                <Link href={route('contact', { item: item.toLowerCase() })} className="text-gray-600 cursor-pointer font-semibold transition-colors duration-300 hover:text-[var(--primary-color)]">
                  {item}
                </Link>
                <span className="progress"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold text-[var(--text-black)] mb-2">Contact</h3>
          <p className="text-gray-700 font-semibold">+880 123 45 67 89 0</p>
          <p className="text-gray-700 font-semibold">mail@gmail.com</p>
          <p className="text-gray-500 mt-2 text-sm">
            575 Crescent Ave. Quakertown, PA 18951
          </p>
        </div>

        {/* Logo */}
        <div className="flex-1 min-w-[120px] flex justify-center md:justify-end items-center">
          <img src="images/1.png" alt="Logo" className="h-12 md:h-16" />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 md:mt-16 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-t border-gray-200 pt-6">
        {/* Social Icons */}
        <div className="flex gap-4 text-[var(--text-black)] text-lg">
          <Facebook className="cursor-pointer hover:opacity-80 transition-opacity duration-300" />
          <Instagram className="cursor-pointer hover:opacity-80 transition-opacity duration-300" />
          <Twitter className="cursor-pointer hover:opacity-80 transition-opacity duration-300" />
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm md:text-right">
          2020 Orebi Minimal eCommerce Figma Template by Adveits
        </p>
      </div>
    </footer>
  );
}
