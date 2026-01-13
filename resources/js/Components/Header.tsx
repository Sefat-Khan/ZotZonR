import React, { useState } from "react";
import { ChevronDown, Menu, Search, User, ShoppingCart, X } from "lucide-react";
import { Link, router, usePage } from '@inertiajs/react';
import { useCart } from "@/context/CartContext";
import logo from '../../../public/images/logo.png';

export default function Header() {
  const { products, categories, auth } = usePage().props;
  const [showCategory, setShowCategory] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { cart, openCart, setOpenCart, removeFromCart } = useCart();


  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchProduct(query);
    if (query.trim() === "") {
      setFilteredProduct([]);
      setShowSearch(false);
    } else {
      setShowSearch(true);
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setFilteredProduct(filtered);
    }
  };

  const menuRoutes: Record<string, string> = {
  Home: route('home'),
  Shop: route('shop.index'),
  About: route('about'),
  Contacts: route('contact'),
  Checkout: route('checkout'),
};

  return (
    <>
      {/* Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-0">
          {/* Logo */}
          <Link href={route('home')}>
            <img src={logo} alt="Logo" className="h-10" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-x-8 items-center text-[20px] font-bold">
  {Object.keys(menuRoutes).map((item) => (
    <li key={item}>
      <Link
        href={menuRoutes[item]}
        className="text-[var(--text-black)] hover:text-[var(--secondary-color)] transition-all"
      >
        {item}
      </Link>
    </li>
  ))}
</ul>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="text-[var(--primary-color)]"
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-[var(--primary-color)]"
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="md:hidden px-4 pb-4 transition-all duration-300">
            <input
              type="text"
              placeholder="Search..."
              value={searchProduct}
              onChange={handleSearch}
              className="w-full h-[50px] bg-white text-gray-600 border-2 border-[#262626] outline-none px-2 rounded-md"
            />
            {showSearch && filteredProduct.length > 0 && (
              <div className="absolute z-50 bg-white w-[calc(100%-2rem)] mt-2 shadow-lg rounded-md max-h-64 overflow-auto">
                {filteredProduct.map((item) => (
                  <Link
                    key={item.id}
                    href={route("cart.show", item)}
                    state={{ product: item }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setFilteredProduct([]);
                      setSearchProduct("");
                      setShowSearch(false);
                      setShowMobileSearch(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-max-height duration-500 ${
            mobileMenu ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-y-4 p-4 text-[var(--text-black)] font-bold">
            {["Home", "Shop", "About", "Contacts", "Checkout"].map((item) => (
              <li key={item}>
                <Link href={menuRoutes[item]}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-[var(--primary-color)]">
        <div className="container mx-auto flex flex-row justify-between items-center py-4 px-4 md:px-0 gap-4 md:gap-0">

          {/* Category Dropdown */}
          <div className="relative w-full md:w-1/4">
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="w-full flex items-center gap-2 px-4 py-2 text-white hover:text-white/80 transition-all duration-300"
            >
              <span className="block font-bold">Shop By Category</span>
              <ChevronDown
                className={`transition-transform duration-300 ${showCategory ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute left-0 w-[250px] bg-[var(--primary-color)] rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${
                showCategory ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="py-3">
                {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className="text-white/80 font-bold cursor-pointer hover:text-white py-2 pl-4 hover:pl-6 duration-300"
                    >
                      <Link href={route('shop.index')}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="relative w-full md:w-2/4 hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchProduct}
              onChange={handleSearch}
              className="w-full h-[50px] bg-white text-gray-600 border-2 border-[#262626] outline-none px-2 rounded-md"
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 text-black">
              <Search />
            </div>

            {showSearch && filteredProduct.length > 0 && (
              <div className="absolute z-50 bg-white w-full mt-2 shadow-lg rounded-md max-h-64 overflow-auto transition-all duration-300">
                {filteredProduct.map((item) => (
                  <Link
                    key={item.id}
                    href={route("cart.show", item)}
                    state={{ product: item }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setFilteredProduct([]);
                      setSearchProduct("");
                      setShowSearch(false);
                    }}
                  >
                    <div className="flex gap-4 items-center h-[50px]">
                      <img src={item.image_url} alt={item.name} className="object-cover h-full" />
                      <span>{item.name}</span>
                    </div>
                    
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User & Cart */}
          <div className="relative w-full md:w-1/4 flex justify-end items-center gap-2">
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-white cursor-pointer"
            >
              <User />
              <ChevronDown
                className={`transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`}
              />
            </div>

            <div
              className="relative cursor-pointer text-white"
              onClick={() => setOpenCart(true)}
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {/* User Menu Dropdown */}
            <div
              className={`absolute top-[70%] right-0 mt-2 w-[300px] bg-[var(--primary-color)] rounded-md overflow-hidden shadow-lg transition-all duration-500 ease-in-out z-50 ${
                showUserMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="py-4">
                {auth.user ? (
                    auth.user.role !== 'admin' ? (
                      <>
                        <li className="text-white/80 font-bold cursor-pointer hover:text-white font-sans text-base py-2 pl-3 hover:pl-6">
                          <Link href={route('profile.edit')}>My Account</Link>
                        </li>
                        <li
                          className="text-white/80 font-bold cursor-pointer hover:text-white font-sans text-base py-2 pl-3 hover:pl-6"
                          
                        >
                          <Link href={route('user.order')}>Orders</Link>
                        </li>
                        <li
                          className="text-white/80 font-bold cursor-pointer hover:text-white font-sans text-base py-2 pl-3 hover:pl-6"
                          onClick={() => router.post(route('logout'))}
                        >
                          Logout
                        </li>
                      </>
                    ) : null // hide menu for admin
                  ) : (
                    <>
                      <li className="text-white/80 font-bold cursor-pointer hover:text-white font-sans text-base py-2 pl-3 hover:pl-6">
                        <Link href={route('login')}>Login</Link>
                      </li>
                      <li className="text-white/80 font-bold cursor-pointer hover:text-white font-sans text-base py-2 pl-3 hover:pl-6">
                        <Link href={route('register')}>Sign Up</Link>
                      </li>
                    </>
                  )}

              </ul>
            </div>

            {/* CART DRAWER */}
              <div
                className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-[999] transform transition-transform duration-500 ${
                  openCart ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-bold">My Cart</h2>
                  <X className="cursor-pointer" onClick={() => setOpenCart(false)} />
                </div>

                {/* Cart Items */}
                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
                  {cart.length === 0 && (
                    <p className="text-gray-500 text-center">Cart is empty</p>
                  )}

                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          ৳{item.totalPrice}
                        </p>
                      </div>

                      <X
                        className="text-red-500 cursor-pointer"
                        size={18}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Checkout Button (FIXED) */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      router.visit(route('checkout'));
                    }}
                    className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold"
                  >
                    Checkout
                  </button>
                </div>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
